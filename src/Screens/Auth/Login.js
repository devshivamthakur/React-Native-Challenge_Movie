import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'

const Login = (props) => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [allData, setAllData] = useState([])
    const dispatch=useDispatch()
    const validateUsername = (txt) => {

        let reg = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
        if (txt.length ==0) {
            setUsernameError("Please Enter username")
            return false
        } else if (!reg.test(txt)) {
            setUsernameError("Please Enter valid User name")
            return false
        }
        else {
            setUsernameError(null)
            return true
        }

    }
    const validatePassword = (txt) => {
        const regx= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (txt.length < 8) {
            setPasswordError("Password must be at least 8 characters")
            return false
        }
        else if (!regx.test(txt)) {
            setPasswordError("Password must be atleast 8 characters including one alphanumeric and one special characters.")
            return false
        }
        else {
            setPasswordError(null)
            return true
        }
    }
    const fetchalldata = async () => {
        const data = await AsyncStorage.getItem('user');
        if (data) {
            setAllData(JSON.parse(data))
        }
    }

    useEffect(() => {
        fetchalldata()
    }, [])
    const validate=()=>{
        var flag=true;
        if(!validateUsername(username)){
            flag=false;
        }
        if(!validatePassword(password)){
            flag=false;
        }

        return flag;
    }
    const onPresslogin=()=>{
        if(validate()){
            const data = allData.filter(item => item.username === username && item.password === password)
            if (data.length > 0) {
                AsyncStorage.setItem('logedinuser', JSON.stringify(data[0]))
                dispatch({type:'LOGIN',payload:data[0]})
                alert("Login Successfully")
                props.navigation.replace('Tab')
            } else {
                alert("Invalid User name or Password")
            }
        }

    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
        >
            <Text
                style={styles.txth}
            >Login</Text>
            <View
                style={{
                    width: "95%",
                    alignSelf: "center",
                    marginTop:"15%"
                }}
            >
                <Text
                style={styles.txtlabel}
                >Username </Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="User Name"
                    value={username}
                    onChangeText={(txt) => {
                        setusername(txt)
                        validateUsername(txt)
                    }}
                />
                {usernameError && <Text style={styles.error}>{usernameError}</Text>}
                <Text
                style={styles.txtlabel}
                >Password </Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Password"
                    value={password}
                    onChangeText={(txt) => {
                        setPassword(txt)
                        validatePassword(txt)
                    }}
                    secureTextEntry={true}
                />
                {passwordError && <Text style={styles.error}>{passwordError}</Text>}
                <TouchableOpacity
                        style={styles.btnlogin}
                        onPress={() => {
                            onPresslogin()
                           
                        }}

                    ><Text style={styles.btnlogintxt} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.signtupbtn}
                    onPress={()=>{
                        props.navigation.navigate('Register')

                    }}
                    >
                        <Text
                         style={styles.signtupbtntxt}
                        >Don't have Account? signup</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    txtlabel:{
        fontSize:14,
        color:"#000",
        marginTop: "5%"



    },
    signtupbtntxt:{
        color:"#000",
        fontSize:16,
        fontWeight:"700"


    },
    signtupbtn:{
        alignSelf:"center",
        marginTop:"5%"

    },
    btnlogintxt: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
    btnlogin: {

        padding: 15,
        alignItems: "center",
        marginTop:"20%",

        borderRadius: 5,
        backgroundColor: "#6c55e0"
    },
    error: {
        fontSize: 12,
        color: "red",
        marginTop: "1%",
        fontWeight: "400",


    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#6c55e0",
        padding: 12,
        fontSize: 14,
        color: "#000",
        marginTop: "1%"

    },
    txth: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#6c55e0",
        fontFamily: "sf_pro_display_heavy",
        textAlign: "center",
        marginTop: "23%"

    },

})