const test = require('node:test');
const assert = require('node:assert/strict');
const {fetchWeather} = require('../weatherClient');

test('uses HTTPS, encodes the key, and reads temperature and condition', async () => {
    const result = await fetchWeather(31.2, 121.5, {apiKey: 'test&key', fetchImpl: async (url) => {
        const request = new URL(url);
        assert.equal(request.protocol, 'https:');
        assert.equal(request.searchParams.get('appid'), 'test&key');
        assert.equal(request.searchParams.get('lat'), '31.2');
        assert.equal(request.searchParams.get('units'), 'metric');
        return {ok: true, json: async () => ({main: {temp: 23.5}, weather: [{main: 'Clear'}]})};
    }});
    assert.deepEqual(result, {temp: 23.5, condition: 'Clear'});
});

test('missing key never sends a request', async () => {
    await assert.rejects(fetchWeather(0, 0, {fetchImpl: () => assert.fail('unexpected request')}), /EXPO_PUBLIC_OPENWEATHER_API_KEY/);
});

test('rejects service errors and incomplete weather data', async () => {
    await assert.rejects(fetchWeather(0, 0, {apiKey: 'test', fetchImpl: async () => ({ok: false, status: 401})}), /401/);
    for (const body of [{}, {main: {temp: '23'}, weather: [{main: 'Clear'}]}, {main: {temp: 23}, weather: []}]) {
        await assert.rejects(fetchWeather(0, 0, {apiKey: 'test', fetchImpl: async () => ({ok: true, json: async () => body})}), /incomplete data/);
    }
});

test('propagates network errors', async () => {
    await assert.rejects(fetchWeather(0, 0, {apiKey: 'test', fetchImpl: async () => {throw new Error('Network unavailable');}}), /Network unavailable/);
});

test('forwards cancellation and reports it without leaving a timer running', async () => {
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(fetchWeather(0, 0, {apiKey: 'test', signal: controller.signal, fetchImpl: async (_, {signal}) => {
        assert.equal(signal.aborted, true);
        const error = new Error('Aborted');
        error.name = 'AbortError';
        throw error;
    }}), /cancelled or timed out/);
});
