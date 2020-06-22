import React from "react";
import {StyleSheet, Text, View} from "react-native"
import PropTypes from "prop-types";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {StatusBar} from "expo-status-bar";

const weatherOptions = {
    Thunderstorm: {
        iconName: "weather-lightning-rainy",
        gradient: ["#373B44", "#4286f4"],
        title: "Today's weather is ThunderStorm",
        subtitle: "Best not to go out, be careful!"
    },
    Sunny: {
        iconName: "weather-sunny",
        gradient: ["#f05053", "#e1eec3"],
        title: "Today's weather is Sunny",
        subtitle: "we walk in the warm Sunshine, keep healthy"
    },
    Drizzle: {
        iconName: "weather-rainy",
        gradient: ["#bdc3c7", "#2c3e50"],
        title: "Today's weather is Drizzle",
        subtitle: "It's started to drizzle"
    },
    Rain: {
        iconName: "weather-pouring",
        gradient: ["#4286f4", "#373B44"],
        title: "Today's weather is Rainy",
        subtitle: "we could see the rainbow in our house or working office"
    },
    Snow: {
        iconName: "weather-snowy",
        gradient: ["#E0EAFC", "#CFDEF3"],
        title: "Today's weather is Snowy",
        subtitle: "Do you want to build snowman? Yes~"
    },
    Haze: {
        iconName: "weather-hazy",
        gradient: ["#77A1D3", "#79CBCA", "#E684AE"],
        title: "Today's weather is Hazy ㅠㅠ",
        subtitle: "Weather is not clear, Please wear a clean mask "
    },
    Clear: {
        iconName: "weather-sunny",
        gradient: ["#2980B9", "#6DD5FA", "#FFFFFF"],
        title: "Today's weather is so Good",
        subtitle: "Perfect weather! Let's go to the party!"
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#D7D2CC", "#304352"],
        title: "Today's weather is Cloudy",
        subtitle: "Cloudy feeling is not good, just listen to the enjoyable music"
    },
    Fog: {
        iconName: "weather-fog",
        gradient: ["#B993D6", "#8CA6DB"],
        title: "Today's weather is Foggy OMG",
        subtitle: "OMG Foggy! I couldn't see anymore."

    },
    Tornado: {
        iconName: "weather-tornado",
        gradient: ["#1D2B64", "#F8CDDA"],
        title: "Tornado is coming",
        subtitle: "We can imagine about Thor tornado, OH-So-COOL!"
    },
    Squall: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Squall",
        subtitle: "A squall is a sudden, sharp increase in wind speed lasting minutes, contrary to a wind gust lasting seconds."
    },
    Ash: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Ash",
        subtitle: "Ha ash...keep a mask!"
    },
    Dust: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Today's weather is Dusty",
        subtitle: "Ha dust...we should keep a mask"
    },
    Sand: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Today's weather is Sandy",
        subtitle: "Ha Sand...we could keep a mask"
    },
    Smoke: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Smoke",
        subtitle: "Ha Smoke...It's likely cigarette smoke!"
    },
    Mist: {
        iconName: "weather-tornado",
        gradient: ["#C9D6FF", "#E2E2E2"],
        title: "Mist",
        subtitle: "Just so so. Did you watch the Mist movie? That's incredible!"
    }

};
export default function Weather({temp, condition}) {
    return (
        <LinearGradient
            colors={weatherOptions[condition].gradient}
            style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={96} color="white"/>
                <Text style={styles.temp}>{temp}°</Text>
            </View>
            <View style={styles.halfContainer}>
                <View style={{...styles.halfContainer, ...styles.textContainer}}>
                    <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                    <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["Thunderstorm", "Sunny", "Drizzle", "Rain", "Snow", "Haze", "Clear", "Clouds", "Fog", "Tornado"]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10
    },
    subtitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 24
    },
    textContainer: {
        alignItems: "flex-start"
    }
});