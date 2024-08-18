import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { haze, rainy, snow, thunder, cloudy, clear } from "../index";
import SearchBar from "./SearchBar";

const Weather = ({ weatherData, fetchWeatherData }) => {
  const [fontsLoaded] = useFonts({
    "gl-Bold": require("../../../assets/fonts/Gilroy-Bold.ttf"),
    "gl-extraBold": require("../../../assets/fonts/Gilroy-ExtraBold.ttf"),
    "gl-Light": require("../../../assets/fonts/Gilroy-Light.ttf"),
    "gl-Medium": require("../../../assets/fonts/Gilroy-Medium.ttf"),
    "gl-SemiBold": require("../../../assets/fonts/Gilroy-SemiBold.ttf"),
    "gl-Regular": require("../../../assets/fonts/Gilroy-Regular.ttf"),
    "gl-Thin": require("../../../assets/fonts/Gilroy-Thin.ttf"),
  });

  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity, feels_like },
    wind: { speed },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    console.log(main);

    // Set background image based on weather condition (main)
    switch (main) {
      case "Haze":
        setBackgroundImage(haze);
        break;
      case "Mist":
        setBackgroundImage(haze);
        break;
      case "Rain":
        setBackgroundImage(rainy);
        break;
      case "Snow":
        setBackgroundImage(snow);
        break;
      case "Clear":
        setBackgroundImage(clear);
        break;
      case "Clouds":
        setBackgroundImage(cloudy);
        break;
      case "Thunderstorm":
        setBackgroundImage(thunder);
        break;
      default:
        setBackgroundImage(null);
        break;
    }
  }, [main]);
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.AppContainer}>
      {backgroundImage && (
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}>
          <TouchableOpacity
            onPress={() => Linking.openURL("http://aparupganguly.com")}>
            <Text style={styles.creditText}>Forecast by Aparup</Text>
          </TouchableOpacity>
          <Text style={styles.weatherTypeText}>{main}</Text>

          <View style={styles.moreInfoTexts}>
            <Text style={styles.feelsLikeText}>
              Feels like {(feels_like - 273.15).toFixed(2)}°C
            </Text>
            <Text style={styles.feelsLikeText}>Humidity {humidity}%</Text>
          </View>

          <Text style={styles.temperature}>{(temp - 273.15).toFixed(0)}°C</Text>

          <Text style={styles.windSpeedText}>Wind Speed {speed} m/s</Text>
          <View style={styles.locationContainer}>
            <Image
              source={require("../../../assets/images/locationIcon.png")}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{name}</Text>
          </View>
          <SearchBar fetchWeatherData={fetchWeatherData} />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },

  locationIcon: { width: 30, height: 30, marginRight: 10, marginTop: 100 },
  moreInfoTexts: {
    flexDirection: "row",
    gap: 40,
    marginTop: 30,
  },
  creditText: {
    fontFamily: "gl-Regular",
    color: "#D5DBE1",
    fontSize: 22,
    paddingTop: 10,
    bottom: 90,
    textDecorationLine: "underline",
  },
  temperature: {
    fontFamily: "gl-SemiBold",
    color: "#EDEDED",
    fontSize: 100,
    marginTop: 30,
  },
  AppContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  windSpeedText: {
    fontSize: 22,
    color: "#C2C2C2",
    fontFamily: "gl-Medium",
    marginTop: 40,
    top: 20,
  },
  weatherTypeText: {
    fontSize: 40,
    color: "#D5DBE1",
    fontFamily: "gl-Medium",
    paddingTop: 70,
  },
  locationText: {
    fontSize: 44,
    color: "#D5DBE1",
    fontFamily: "gl-SemiBold",
    marginTop: 30,
    paddingTop: 70,
  },
  feelsLikeText: {
    fontSize: 22,
    color: "#D5DBE1",
    marginTop: 30,
    fontFamily: "gl-Medium",
  },
});

export default Weather;
