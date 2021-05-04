import React from 'react'
import {Button, Text, View} from "react-native";

export default function Splash({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>FastConnect</Text>
            <Button title={"PreRegister"} onPress={() => navigation.navigate('PreRegister')}/>
            <Button title={"Register"} onPress={() => navigation.navigate('Register')}/>
            <Button title={"Login"} onPress={() => navigation.navigate('Login')}/>
        </View>
    )
}
