import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style = {styles.weatherItem}>
            <Text style={styles.weatherItemTitle}>{title}</Text>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}


const DateTime = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState ('')
    const [time, setTime] = useState ('')


    //Create a useEffect hook to update the date and time
    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth(); //Current Month
            const date = time.getDate(); //Current date
            const day = time.getDay(); // Current day
            const hour = time.getHours(); //Hour of the day
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour // Use the 12h format
            const minutes = time.getMinutes(); // Get the minutes of the day
            const ampm = hour >=12 ? 'PM' : 'AM' //Time of day

            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + ampm)

            setDate(days[day] + ', ' + date+ ' ' + months[month])

        }, 1000);

    }, [])

    return (
        /*This is the main container that houses all the relevant info such as day, time, location and so on.
        We use current? current.{data} : "" because we have nothing to show before the we fetch the data from the API,
        so showing an empty string doesn't crash the app.
        */
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.heading}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.subheading}>{date}</Text>
                </View>
                <View style = {styles.weatherItemContainer}>
                    <WeatherItem title="Humidity" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title = "Wind speed" value={current? current.wind_speed: ""} unit = "m/s"/>
                    <WeatherItem title="Sunrise" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Sunset" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="pm"/>
                </View>
            </View>
                <View style={styles.rightAlign}>
                    <Text style={styles.timezone}>{timezone}</Text>
                    <Text style={styles.latlon}>{lat} N, {lon} E</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heading: {
        fontSize: 45,
        color: "white",
        fontWeight: "100",
        marginTop: 20,
        marginLeft: 5
    },
    subheading: {
        fontSize: 25,
        color: '#eee',
        fontWeight: "300",
        marginLeft: 5
    },
    rightAlign: {
        textAlign: 'right',
        marginTop: 25,
        marginRight: 5
    },
    timezone: {
        fontSize: 20,
        color: "white",
        marginTop: 15
    },
    latlon: {
        fontSize: 15,
        color: "white",
        fontWeight: "800",

    },
    weatherItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 25,
        padding: 10,
        marginTop: 60,
        marginLeft: 15

    },
    weatherItem: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    weatherItemTitle: {
        color: "#eee",
        fontSize: 15,
        fontWeight: '100'

    }
})

export default DateTime;