import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",

  },
  searchBar__unclicked: {
    padding: 7,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  searchBar__clicked: {
    // padding: 7,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: "80%",
  },
});