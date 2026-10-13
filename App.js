import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import Weather from "./Weather";
import {fetchWeather} from "./weatherClient";

export default class App extends React.Component {
    state = {isLoading: true, error: null};
    mounted = false;

    componentDidMount() {
        this.mounted = true;
        this.getLocation();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.controller?.abort();
    }

    getLocation = async () => {
        this.setState({isLoading: true, error: null});
        this.controller = new AbortController();
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                throw new Error("Location permission is required to show your local weather. Enable it in Settings and try again.");
            }
            const {coords} = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced});
            const weather = await fetchWeather(coords.latitude, coords.longitude, {
                apiKey: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
                signal: this.controller.signal
            });
            if (this.mounted) this.setState({...weather, isLoading: false});
        } catch (error) {
            if (this.mounted) this.setState({isLoading: false, error: error.message || "Unable to load weather. Please try again."});
        }
    };

    render() {
        const {isLoading, error, temp, condition} = this.state;
        if (isLoading) return <Loading/>;
        if (error) return (
            <View style={styles.error}>
                <Text accessibilityRole="alert" style={styles.message}>{error}</Text>
                <Button title="Try again" onPress={this.getLocation}/>
            </View>
        );
        return <Weather temp={Math.round(temp)} condition={condition}/>;
    }
}

const styles = StyleSheet.create({
    error: {flex: 1, justifyContent: "center", padding: 32, backgroundColor: "#FDF6AA"},
    message: {fontSize: 18, marginBottom: 24, color: "#2c2c2c"}
});
