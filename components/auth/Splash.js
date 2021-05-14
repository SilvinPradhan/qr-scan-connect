import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {View, Text} from "react-native";
import styles from './SplashStyles'
import {Button} from "react-native";

export default function Splash({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' hidden={true}/>
            <Text style={{textAlign: 'center', flex: 1}}>FastConnect</Text>
            <Button title={"PreRegister"} onPress={() => navigation.navigate('PreRegister')}/>
            <Button title={"Register"} onPress={() => navigation.navigate('Register')}/>
            <Button title={"Login"} onPress={() => navigation.navigate('Login')}/>
        </View>
    )
}
