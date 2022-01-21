import moment from 'moment';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';


const Forecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            {
                data && data.length > 0 ? //If no data = show an empty View

                data.map((data, idx) => (

                    idx !== 0 &&  <ForecastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }



        </View>
    )
}


const ForecastItem = ({forecastItem}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/'+ forecastItem.weather[0] + '@2x.png'} //We still want the first icon that comes from the forecast array
    return(
        <View style = {styles.forecastItemContainer}>
            <Text style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source = {img} style={styles.image} />
            <Text style = {styles.temp}>Day: {forecastItem.temp.day}&#176;C</Text>
            <Text style = {styles.temp}>Night: {forecastItem.temp.night}&#176;C</Text>

        </View>
    )
}

export default Forecast;

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    },
    forecastItemContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#00000033",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
        padding: 50,
        margin: 5,
        marginLeft: 10
    },
    day: {
        fontSize: 15,
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
        fontSize: 13,
        color: "white",
        fontWeight: "100",
        textAlign: "center"
    },

})
