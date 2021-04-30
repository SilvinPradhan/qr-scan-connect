import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/auth/Splash'
import RegisterScreen from './components/auth/Register'
import firebase from 'firebase'
import LoginScreen from "./components/auth/Login";

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

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loaded: true,
                    signedIn: false
                })
            } else {
                console.log(user)
                this.setState({
                    loaded: true,
                    signedIn: true
                })
            }
        })
    }

    render() {
        const {loaded, signedIn} = this.state;
        if (!loaded) {
            return (<View style={{flex: 1, justifyContent: 'center'}}><Text
            > Loading < /Text></View>)
        }
        if (!signedIn) {
            return (<NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={"Register"} component={RegisterScreen}/>
                    <Stack.Screen name={"Login"} component={LoginScreen}/>
                </Stack.Navigator>
            </NavigationContainer>)
        }
        return (
            <>
                <View style={{flex: 1, justifyContent: 'center'}}><Text
                > User is Logged in < /Text></View>
            </>
        );
    }
}

export default App;
