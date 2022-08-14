import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const height = Dimensions.get("window").height
import { useSelector } from 'react-redux'

const Detailsscreen = (props) => {
  const States=useSelector(state=>state.Moviereducer)

  const translation = useRef(new Animated.Value(-100)).current;
  const [isOpen, setIsOpen] = useState(false);

  const get_date = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var data1 = date.split("-")
    return months[data1[1] - 1] + " " + data1[2] + "," + data1[0]



  }
  useEffect(() => {
    Animated.timing(translation, {
      toValue: isOpen ? -10 : 10,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);



  return (
    <ImageBackground
      style={styles.main}
      source={{ uri: `https://image.tmdb.org/t/p/original${States.movieinfo.backdrop_path}` }}


    >
      <TouchableOpacity
        style={styles.header}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="md-chevron-back" size={25}
          color="#5b4c48"
        />
        <Text
          style={styles.txtback}
        >Back</Text>

      </TouchableOpacity>

        <Animated.View
          style={[styles.infoview, {
            transform: [
              { translateY: translation },
            ],

          }]}
          onTouchStart={(event) => {
            const scrolling=event.nativeEvent.locationY
            if (scrolling > 10) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
        >

          <Text
            style={styles.title}
          > {States.movieinfo.title} </Text>
          <Text
            style={styles.date}
          > {get_date(States.movieinfo.release_date)}</Text>
          <View
            style={[styles.row, { marginTop: "1%" }]}
          >
            <View
              style={styles.row}
            >
              <MaterialCommunityIcons
                name="chess-queen"
                size={22}
                color="#fff"
              />
              <Text
                style={styles.txtrating}
              >{States.movieinfo.vote_average} %</Text>

            </View>
            <View
              style={styles.row}
            >
              <MaterialCommunityIcons
                name="alarm"
                size={25}
                color="#fff"
              />
              <Text
                style={styles.txtrating}
              > NA   </Text>

            </View>
          </View>
          <Text
            style={styles.disc}
          >
            {States.movieinfo.overview}
          </Text>




        </Animated.View>
   




    </ImageBackground>
  )
}

export default Detailsscreen

const styles = StyleSheet.create({

 
  disc: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: "1%"
  },

  txtrating: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: "1%"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 15,
    color: "#fff",
    marginTop: "3%"

  },
  title: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    marginTop: "5%"

  },
  infoview: {
    position:"absolute",
    left:"5%",
    right:"5%",
    bottom:10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 10,


  },
  txtback: {
    fontSize: 15,
    color: "#5b4c48"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#edac43",


  },

  main: {
    flex: 1
  },
})