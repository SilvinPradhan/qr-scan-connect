import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {View, ActivityIndicator} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/auth/Splash'
import HomeScreen from './components/Home'
import RegisterScreen from './components/auth/Register'
import PreRegisterScreen from './components/auth/PreRegister'
import firebase from 'firebase'
import LoginScreen from "./components/auth/Login";
import AddScreen from "./components/home/Add"
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux";
import rootReducer from './redux/reducer'
import thunk from 'redux-thunk'
import {decode, encode} from 'base-64'
import styles from "./AppStyles";

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

const store = createStore(rootReducer, applyMiddleware(thunk))

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
            return (<View style={styles.container}><ActivityIndicator size="large"/>
            </View>)
        }
        if (!signedIn) {
            return (<
                NavigationContainer>
                < Stack.Navigator
                    initialRouteName="FlashConnect">
                    < Stack.Screen
                        name="FastConnect"
                        component={SplashScreen}
                        options={
                            {
                                headerShown: false
                            }
                        }
                    />
                    <Stack.Screen name={"Register"} component={RegisterScreen}/>
                    <Stack.Screen name={"PreRegister"} component={PreRegisterScreen}/>
                    <Stack.Screen name={"Login"} component={LoginScreen}/>
                </Stack.Navigator>
            </NavigationContainer>)
        }
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Add" component={AddScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default App;
