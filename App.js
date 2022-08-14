import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from './src/Screens/Auth/Signup';
import Login from './src/Screens/Auth/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './src/Screens/HomeScreen/Homescreen';
import Profile from './src/Screens/Profile/Profile';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Detailsscreen from './src/Screens/DetailsScreen/Detailsscreen';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const store=configureStore()
const App = () => {
  const Tab_navigation = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarActiveBackgroundColor: "#f0b85d",
          tabBarInactiveBackgroundColor: "#f0b85d"
        }}

      >
        <Tab.Screen name="Home" component={Homescreen}

          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons name='home' color={focused ? "#000" : '#988F94'} size={size} />

              )
            },
            headerShown: false,
            tabBarShowLabel: false

          }}
        />
        <Tab.Screen name="Profile" component={Profile}

          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Feather name='user' color={focused ? "#000" : '#988F94'} size={size} />

              )
            },
            headerShown: false,
            tabBarShowLabel: false


          }}

        />

      </Tab.Navigator>
    )
  }
  return (
    <Provider store={store} >
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Tab"

      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Signup} />
        <Stack.Screen name="Tab" component={Tab_navigation} />
        <Stack.Screen name="Details" component={Detailsscreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App