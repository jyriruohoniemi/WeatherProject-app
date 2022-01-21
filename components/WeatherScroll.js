import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Forecast from './Forecast'
import moment from 'moment-timezone' //Moment is used to convert timne raw time data from the json file in to normal human time

const WeatherScroll = ({weatherData}) => {
    return(
        <ScrollView horizontal = {true} styles={styles.ScrollView}>
            <CurrentTemp data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <Forecast data={weatherData}/>
        </ScrollView>
    )
}

const CurrentTemp = ({data}) => {

    if(data && data.weather){
    const img = {uri: 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png' } //We want the first icon that comes from the forecast array
    return (
        <View style={styles.currentTemperatureContainer}>
            <Image source={img} style={styles.image}/>
                <View style={styles.nestedContainer}>
                    <Text style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text style={styles.temp}>Day: {data.temp.day}&#176;C</Text>
                    <Text style={styles.temp}>Night: {data.temp.night}&#176;C</Text>

                </View>
        </View>
    )
    } else {

        return(
            <View>
                <Text>Loading... Please wait...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
        flex: 0.6,
        backgroundColor: "#18181bcc",
        padding: 20
    },
    image: {
        width: 130,
        height: 130
    },
    currentTemperatureContainer: {
        flexDirection: "row",
        backgroundColor: '#00000033',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: "#eee",
        borderWidth: 1,
        padding: 5
    },
    day: {
        fontSize: 20,
        color: "white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign: "center",
        borderRadius: 50,
        fontWeight: "100",
        textAlign: "center",
        marginBottom: 15

    },
    temp: {
        fontSize: 16,
        color: "white",
        fontWeight: "100",
        textAlign: "center"
    },
    nestedContainer: {
        paddingRight: 40,

    }

})

export default WeatherScroll;