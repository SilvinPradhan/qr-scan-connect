import React, {Component} from 'react'
import {View, Button, TextInput, Text, TouchableOpacity} from "react-native";
import firebase from 'firebase'
import 'react-native-gesture-handler'
import styles from './PreRegisterStyle'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export class PreRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'dummy@dummy.com',
            loading: false
        }
        this.RegisterEmail = this.RegisterEmail.bind(this)
    }

    RegisterEmail = async () => {
        try {
            const {email} = this.state

            this.setState({
                loading: true
            })
            const config = {
                handleCodeInApp: true,
                url: 'http://localhost:19006/Register'
            }
            await firebase.auth().sendSignInLinkToEmail(email, config).then(() => {
                console.log('Email has been sent. Please check your email')
                alert('Email has been sent. Please verify your email.');

            })
            //     .then(
            //     () => {
            //         this.setState({
            //             email: '',
            //             loading: ''
            //         })
            //     }
            // )
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={{flex: 1, width: '100%'}} keyboardShouldPersistTaps="always">
                    <Text style={{flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: '5px'}}>Register
                        Email</Text>
                    <TextInput style={styles.input}
                               placeholder='E-mail'
                               placeholderTextColor="#aaaaaa" onChangeText={(email) => this.setState({email})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none" required/>
                    <TouchableOpacity style={styles.button} onPress={() => this.RegisterEmail()}
                    ><Text
                        style={styles.buttonTitle}>Send Verification</Text></TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default PreRegister
