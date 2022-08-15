import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get("screen").width

const Signup = props => {

    const [fname, setfname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")

    const [fnameError, setfnameError] = useState(null)
    const [emailError, setemailError] = useState(null)
    const [phoneError, setphoneError] = useState(null)
    const [passwordError, setpasswordError] = useState(null)
    const [repasswordError, setrepasswordError] = useState(null)


    const validateUsername = (txt) => {

        let reg = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
        if (txt.length < 3) {
            setfnameError("User name must be at least 3 characters")
            return false
        } else if (!reg.test(txt)) {
            setfnameError("Enter valid User name")
            return false
        }
        else {
            setfnameError(null)
            return true
        }

    }

    const validateEmail = (email) => {
        const emailregx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailregx.test(email)) {
            setemailError("Enter valid email address")
            return false
        }
        else {
            setemailError(null)
            return true
        }

    };
    const validatePhone = (txt) => {
        let reg = /^([0-9]){10,14}$/;
        if (txt.length < 10) {
            setphoneError("Phone number must be at least 10 digits")
            return false
        }
        else if (!reg.test(txt)) {
            setphoneError("Enter valid phone number")
            return false
        }
        else {
            setphoneError(null)
            return true
        }

    }
    const validatePassword = (txt) => {
        const regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (txt.length < 8) {
            setpasswordError("Password must be at least 8 characters")
            return false
        }
        else if (!regx.test(txt)) {
            setpasswordError("Password must be atleast 8 characters including one alphanumeric and one special characters.")
            return false
        }
        else {
            setpasswordError(null)
            return true
        }
    }
    const validateRePassword = (txt) => {
        if (txt == "") {
            setrepasswordError("Please enter password")
            return false
        }
        if (txt !== password) {
            setrepasswordError("Password does not match")
            return false
        }
        else {
            setrepasswordError(null)
            return true
        }
    }
    const validate = () => {
        var flag = true;
        if (!validateUsername(fname)) {
            flag = false;
        }
        if (!validateEmail(email)) {
            flag = false;
        }
        if (!validatePhone(phone)) {
            flag = false;
        }
        if (!validatePassword(password)) {
            flag = false;
        }
        if (!validateRePassword(repassword)) {
            flag = false;
        }
        return flag;

    }

    const crna = async () => {
        const data = await AsyncStorage.getItem("user");
        const userdata = {
            username: fname,
            email: email,
            phone: phone,
            password: password

        }
        if (validate()) {
            let users = [];
            if (data == null) {
                users.push(userdata);
            } else {
                users = JSON.parse(data);
                const checked = users.find(user => {
                    return user.username == fname || user.email == email || user.phone == phone;
                })
                if (checked && Object.keys(checked).length > 0) {
                    alert("User already exists");
                    return;
                }
                users.push(userdata);
            }
            AsyncStorage.setItem("user", JSON.stringify(users));
            alert("Registered Successfully");
            props.navigation.replace("Login")
        } else {
            alert("Please fill all the fields");
        }

    }



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff"
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: "5%"
                }}
            >
                <Ionicons name="arrow-back" size={25} color={"#6c55e0"}
                    style={{
                        margin: 10
                    }}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                />
                <Text
                    style={style.txth}
                >Register</Text>
                <View
                    style={{
                        width: width * 0.9,
                        alignSelf: "center"
                    }}
                >
                    <Text
                        style={style.txtlabel}
                    >Username </Text>
                    <TextInput
                        style={[style.input]}
                        placeholder="User Name"
                        value={fname}
                        onChangeText={(txt) => {
                            setfname(txt)
                            validateUsername(txt)
                        }}
                    />
                    {fnameError && <Text style={style.error}>{fnameError}</Text>}
                    <Text
                        style={style.txtlabel}
                    >Email </Text>
                    <TextInput
                        style={[style.input]}
                        placeholder="Enter your email address"
                        value={email}
                        autoComplete="off"
                        onChangeText={(txt) => {
                            setemail(txt)
                            validateEmail(txt)

                        }}
                    />
                    {emailError && <Text style={style.error}>{emailError}</Text>}
                    <Text
                        style={style.txtlabel}
                    >Phone number </Text>
                    <TextInput
                        style={[style.input]}
                        placeholder="Enter your phone number"
                        value={phone}
                        maxLength={10}
                        onChangeText={(txt) => {
                            setphone(txt)
                            validatePhone(txt)
                        }}
                        keyboardType='phone-pad'
                    />
                    {phoneError && <Text style={style.error}>{phoneError}</Text>}
                    <Text
                        style={style.txtlabel}
                    >Password </Text>
                    <TextInput
                        style={[style.input]}
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(txt) => {
                            setpassword(txt)
                            validatePassword(txt)

                        }}
                    />
                    {passwordError && <Text style={style.error}>{passwordError}</Text>}
                    <Text
                        style={style.txtlabel}
                    >Confirm password </Text>
                    <TextInput
                        style={[style.input]}
                        placeholder="Confirm Password"
                        value={repassword}
                        secureTextEntry={true}
                        onChangeText={(txt) => {
                            setrepassword(txt)
                            validateRePassword(txt)


                        }}
                    />
                    {repasswordError && <Text style={style.error}>{repasswordError}</Text>}



                    <TouchableOpacity
                        style={style.btnlogin}
                        onPress={() => {
                            crna()
                        }}

                    ><Text style={style.btnlogintxt} >SIGN UP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={style.signtupbtn}
                    onPress={()=>{
                        props.navigation.goBack()

                    }}
                    >
                        <Text
                         style={style.signtupbtntxt}
                        >Already have account? Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Signup;
const style = StyleSheet.create({
    signtupbtntxt:{
        color:"#000",
        fontSize:16,
        fontWeight:"700"


    },
    signtupbtn:{
        alignSelf:"center",
        marginTop:"5%"

    },
    txtlabel:{
        fontSize:14,
        color:"#000",
        marginTop: "5%"



    },

    error: {
        fontSize: 12,
        color: "red",
        marginTop: "1%",
        fontWeight: "400",


    },

    txt2: {
        fontSize: 15,
        color: "#000",
        fontWeight: "700",
        marginTop: "3%"
    },
    txtpicker: {
        color: '#000',
        fontSize: 15,
        // fontFamily:"Poppins-Bold"
    },
    img1: {
        width: 35,
        height: 15,
        resizeMode: "cover"
    },
    view1: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#65318C',
        width: '100%',
        marginTop: 4,
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 15,
    },
    btnlogintxt: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
    btnlogin: {

        padding: 15,
        alignItems: "center",
        marginTop: "20%",

        borderRadius: 5,
        backgroundColor: "#6c55e0"
    },
    txtterms_of_service: {
        borderBottomWidth: 0.5,
        color: "#6c55e0",
        borderColor: "#6c55e0"

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
        textAlign: "center"
    },
})
