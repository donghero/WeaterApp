import React from "react";
import {Alert} from "react-native"
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

export default class App extends React.Component {
    state = {
        isLoading: true
    };

    render() {
        const {isLoading, temp, condition} = this.state;
        return (
            isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition} />
        );
    }

    getWeather = async (latitude, longitude) => {
        const {
            data: {
                main: {temp},
                weather
            }
        } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26df358bbce22fdab6dc8e44bac26a6b&units=metric`);

        this.setState({
            isLoading: false,
            temp,
            condition: weather[0].main
        })
    };

    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            await Location.getPermissionsAsync();
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
            this.getWeather(latitude, longitude);
        } catch (error) {
            Alert.alert("Can not find ", "So sad");
        }
    };

    componentDidMount() {
        this.getLocation().then((res) => {
        });
    }
}



