import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native"
import * as Location from 'expo-location'

import DateTime from "./components/DateTime.js";
import WeatherScroll from "./components/WeatherScroll.js";
const API_KEY='c1380d829df4f0d3c65f9bdb10b33cee';
const img = require("./assets/bg.jpg");

export default function App() {
  const [data, setData] = useState('')

  //Create a useEffect hook to update current location by requesting end user location.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("0", "-0")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  //If location access is granted make a fetch request for location data from the OpenWeatherAPI using the lat and lon from the device GPS
  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }

  }
  //Use props to use the real time location data from the API
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
