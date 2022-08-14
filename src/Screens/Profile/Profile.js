import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = (props) => {
  const States=useSelector(state=>state.Moviereducer)
  const dispatch=useDispatch()
  const getloginstatus=async()=>{
    const logedinuser=await AsyncStorage.getItem('logedinuser')
    if(logedinuser){
      let data=JSON.parse(logedinuser)


      dispatch({type:'LOGIN',payload:data})
    }
    
  }
  useEffect(() => {
    getloginstatus()

  }, [])
  const onPressLogout=async()=>{
   await AsyncStorage.removeItem('logedinuser')
    dispatch({type:'LOGIN',payload:{}})
    props.navigation.replace('Tab')
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {Object.keys(States.logedinuser).length>0 &&<Text
        style={styles.txth}
      >Profile</Text>}
     {Object.keys(States.logedinuser).length>0 && <View
        style={{
          width: "90%",
          alignSelf: "center"
        }}
      >


        <Text
          style={styles.label}
        >Username</Text>
        <Text
          style={styles.valuetxt}
        >{States.logedinuser.username} </Text>
        <Text
          style={styles.label}

        >Email</Text>
        <Text
          style={styles.valuetxt}
        >{States.logedinuser.email} </Text>
        <Text
          style={styles.label}

        >Phone number </Text>
        <Text
          style={styles.valuetxt}
        >{States.logedinuser.phone} </Text>
        <TouchableOpacity
        style={styles.btn1}
        onPress={onPressLogout}
        >
          <Text
          style={styles.btntxt2}
          >Logout </Text>
        </TouchableOpacity>

      </View>}
      {Object.keys(States.logedinuser).length==0 &&<View
      style={{
        flexDirection: "row",
        width:"90%",
        alignSelf:"center",
        justifyContent:"space-around",
        marginTop:"40%"
      }}
      >
        <TouchableOpacity
        style={[styles.btn,{backgroundColor:"#f57f17"}]}
        onPress={()=>{
          props.navigation.navigate('Login')
          

        }}
        >
          <Text
          style={styles.btntxt}
          >Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.btn,{backgroundColor:"#1de9b6"}]}
        onPress={()=>{
          props.navigation.navigate('Register')
        }
        }
        >
          <Text
          style={styles.btntxt}
          >Signup </Text>
        </TouchableOpacity>

      </View>}
      
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  btntxt2:{
    color:"#d32f2f",
    fontSize:16,
    fontWeight:"700"


  },
  btn1:{
    justifyContent:"center",
    borderRadius:5,
    padding:12,
    borderWidth:1,
    borderColor:"red",
    marginTop:"10%"

  },
  btntxt:{
    fontSize:14,
    color:"#fff",
    fontWeight:"700"


  },
  btn:{
    width:"45%",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    padding:12,



  },
  valuetxt:{
    fontSize:15,
    fontWeight:"600",
    padding:13,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:5,
    marginTop:5,
    color:"#000"
    


  },
  label: {
    fontSize: 15,
    color: "#000",
    marginTop: "5%"
  },
  txth: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#6c55e0",
    textAlign: "center",
    marginTop: "3%"
  }

}
)