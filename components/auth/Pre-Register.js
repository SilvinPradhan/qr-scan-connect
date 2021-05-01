import React, {Component} from 'react'
import {View, Button, TextInput, Text} from "react-native";
import firebase from 'firebase'

export class PreRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'dummy@dummy.com',
        }
        this.SignIn = this.SignIn.bind(this)
    }

    render() {

        return (
            <View>
                <TextInput placeholder="email" onChangeText={(email) => this.setState({email})} required/>
                <Button onPress={() => this.SignIn()} title="Send Verification"/>
            </View>
        )
    }
}

export default PreRegister
