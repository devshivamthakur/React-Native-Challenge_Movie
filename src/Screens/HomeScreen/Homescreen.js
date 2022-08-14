import { StyleSheet, ToastAndroid, View, FlatList, Image, Text, RefreshControl } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import SearchBar from './Searchbar'
import axios from 'axios'
import Render_movie from './Render_movie'
import LoadingScreen from './LoadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Homescreen = (props) => {
  const States = useSelector(state => state.Moviereducer)
  const dispatch = useDispatch()

  const [clicked, setClicked] = React.useState(false)
  const [searchPhrase, setSearchPhrase] = React.useState("")
  const [refreshing, setrefreshing] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const fetch_movie_data = () => {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/trending/all/day?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed',
    }).then(res => {
      setLoading(false)
      dispatch({ type: 'FETCH_MOVIE_DATA', payload: res.data.results })
    }).catch((err) => {
      ToastAndroid.show('Failed to Fetch movie', ToastAndroid.SHORT)
    })

  }
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout)
    })
  }
  const refreshing_ = () => {
    setLoading(true)
    setrefreshing(true)
    fetch_movie_data()
    wait(2000).then(() => { setrefreshing(false) })


  }


  const movie_datas = useMemo(() => {
    if (States.movie_data.length > 0) {

      return States.movie_data.filter(movie => {
        if (movie.original_title) {
          return movie.original_title.toLowerCase().includes(searchPhrase.toLowerCase())
        } else if (movie.title) {
          return movie.title.toLowerCase().includes(searchPhrase.toLowerCase())
        }else if (movie.name){
          return movie.name.toLowerCase().includes(searchPhrase.toLowerCase())
        }

      })
    }
    return []
  }, [States.movie_data, searchPhrase])

  const getloginstatus = async () => {
    const logedinuser = await AsyncStorage.getItem('logedinuser')
    if (logedinuser) {
      let data = JSON.parse(logedinuser)


      dispatch({ type: 'LOGIN', payload: data })
    }

  }
  useEffect(() => {
    fetch_movie_data()
    getloginstatus()
  }, [])
  return (
    <View
      style={styles.main}
    >

      <FlatList
        ListHeaderComponent={
          <View>
            <Text
              style={styles.txth}
            >{Object.keys(States.logedinuser).length > 0 ? `Hello @${States.logedinuser.username}` : "hello"} </Text>
            <SearchBar
              clicked={clicked}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              setClicked={setClicked}
            />
          </View>

        }
        data={movie_datas}
        renderItem={({ item }) => <Render_movie item={item} navigation={props.navigation}
        />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshing_}
            enabled={true}
            colors={['#ed8127', '#ed8127']}


          />
        }
      />
      <LoadingScreen
        loading={loading}
      />

    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  txth: {
    fontSize: 15,
    fontWeight: "bold",
    padding: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff"

  },
  main: {
    backgroundColor: "#edac43",
    flex: 1
  },

})