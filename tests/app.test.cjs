const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const babel = require('@babel/core');

const code = babel.transformSync(fs.readFileSync(require.resolve('../App.js'), 'utf8'), {
    configFile: false, babelrc: false,
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs']
}).code;

function makeApp(location, fetchWeather) {
    const modules = {
        react: {Component: class {setState(update) {this.state = {...this.state, ...update};}}},
        'react-native': {StyleSheet: {create: value => value}},
        'expo-location': {...location, Accuracy: {Balanced: 3}},
        './Loading': {}, './Weather': {}, './weatherClient': {fetchWeather}
    };
    const context = {exports: {}, require: name => modules[name], AbortController, process: {env: {}}};
    vm.runInNewContext(code, context);
    const app = new context.exports.default();
    app.mounted = true;
    return app;
}

test('denied location permission stops loading without querying weather', async () => {
    const app = makeApp({requestForegroundPermissionsAsync: async () => ({status: 'denied'})}, () => assert.fail('unexpected request'));
    await app.getLocation();
    assert.equal(app.state.isLoading, false);
    assert.match(app.state.error, /permission/);
});

test('weather request errors are awaited and surfaced; retry recovers', async () => {
    let shouldFail = true;
    const app = makeApp({
        requestForegroundPermissionsAsync: async () => ({status: 'granted'}),
        getCurrentPositionAsync: async () => ({coords: {latitude: 31, longitude: 121}})
    }, async (lat, lon) => {
        assert.equal(lat, 31); assert.equal(lon, 121);
        if (shouldFail) throw new Error('Network unavailable');
        return {temp: 21, condition: 'Clear'};
    });
    await app.getLocation();
    assert.equal(app.state.error, 'Network unavailable');
    assert.equal(app.state.isLoading, false);
    shouldFail = false;
    await app.getLocation();
    assert.equal(app.state.error, null);
    assert.equal(app.state.temp, 21);
    assert.equal(app.state.condition, 'Clear');
});

test('unmount aborts the pending request and prevents late state updates', async () => {
    let finish;
    let requestSignal;
    const app = makeApp({
        requestForegroundPermissionsAsync: async () => ({status: 'granted'}),
        getCurrentPositionAsync: async () => ({coords: {latitude: 0, longitude: 0}})
    }, (_, __, {signal}) => {
        requestSignal = signal;
        return new Promise(resolve => {finish = resolve;});
    });
    const pending = app.getLocation();
    await new Promise(resolve => setImmediate(resolve));
    app.componentWillUnmount();
    assert.equal(requestSignal.aborted, true);
    finish({temp: 20, condition: 'Clear'});
    await pending;
    assert.equal(app.state.temp, undefined);
});
