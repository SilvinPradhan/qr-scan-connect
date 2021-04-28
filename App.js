import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/auth/Splash'
import RegisterScreen from './components/auth/Register'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyATHtwtzIqrhOn7yMUb0t0kxXqZY6i8YZg",
    authDomain: "qr-scan-connect.firebaseapp.com",
    projectId: "qr-scan-connect",
    storageBucket: "qr-scan-connect.appspot.com",
    messagingSenderId: "784642783758",
    appId: "1:784642783758:web:35034f78ab992b179c1a5f",
    measurementId: "G-TPGGJGCW41"
};

firebase.initializeApp(firebaseConfig)

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"Register"} component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
