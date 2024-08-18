import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  // KeyboardAvoidingView,
  // Platform,
  // TouchableWithoutFeedback,
  // Keyboard,

} from "react-native";


const SearchBar = ({ fetchWeatherData }) => {
  const [cityName, setCityName] = useState("");

  return (



    <View style={styles.searchBar}>
      <Image
        source={require("../../../assets/images/searchIcon.png")}
        style={styles.icon}
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder='Search Your Location'
        placeholderTextColor='#CCC8C8'

        value={cityName}
        onChangeText={(text) => setCityName(text)}
        onSubmitEditing={() => fetchWeatherData(cityName)}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#898989",
    top: 120,
    flexDirection: "row",
    paddingHorizontal: 20,
    opacity: 0.6,
    paddingVertical: 10,
    borderRadius: 14,
    marginLeft: 10,
    width: "90%",
    alignSelf: "center",
    elevation: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6C6D6E",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    fontSize: 20,
    color: "#f1f1f1",
  },
});
export default SearchBar;
