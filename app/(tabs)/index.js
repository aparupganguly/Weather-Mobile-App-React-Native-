import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Weather from "../(tabs)/Components/Weather";
import { StatusBar } from "expo-status-bar";
import SearchBar from "./Components/SearchBar";
import * as Font from "expo-font";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

const API_KEY = "dbe5e166bcf032d45f22e1ebba15a5ca";
const haze = require("../../assets/images/haze.png");
const rainy = require("../../assets/images/rainy.png");
const snow = require("../../assets/images/snow.png");
const thunder = require("../../assets/images/thunder.png");
const cloudy = require("../../assets/images/cloudy.png");
const clear = require("../../assets/images/clear.png");




export default function App() {

  const [fontsLoaded] = useFonts({

    'gl-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
    'gl-extraBold': require('../../assets/fonts/Gilroy-ExtraBold.ttf'),
    'gl-Light': require('../../assets/fonts/Gilroy-Light.ttf'),
    'gl-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
    'gl-SemiBold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
    'gl-Regular': require('../../assets/fonts/Gilroy-Regular.ttf'),
    'gl-Thin': require('../../assets/fonts/Gilroy-Thin.ttf'),
  });





  <StatusBar backgroundColor="darkgray" />


  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);






  async function fetchWeatherData(cityName) {
    setLoaded(false);

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.log("Error fetching weather data:", error);
      setWeatherData(null);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchWeatherData("Kolkata");
  }, []);


  if (!loaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.centered}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.noDataText}>No data available for this City! Try Something Different!</Text>

      </View>
    );
  }

  return (

    <View style={styles.centered}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,

  },
  noDataText: {
    fontFamily: 'gl-Regular',
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    color: "gray",



  }
});

export { haze, rainy, snow, thunder, cloudy, clear };
