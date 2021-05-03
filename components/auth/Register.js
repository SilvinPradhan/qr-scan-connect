import React, {Component} from 'react'
import {View, Button, TextInput, Text, Image, TouchableOpacity} from "react-native";
import firebase from 'firebase'
import styles from './RegisterStyles';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export class Register extends Component {
    constructor({props}) {
        super(props);
        this.state = {
            name: 'Dummy Pradhan',
            email: 'dummy@dummy.com',
            password: 'Dummy@1',
            confirmPassword: 'Dummy@1'
        }
        this.SignUp = this.SignUp.bind(this)
    }

    SignUp() {
        //Code Goes Here
        const {name, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert('Passwords does not match.')
            return
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then(results => {
            console.log(results)
            const uid = results.user.uid
            const data =
                {
                    id: uid,
                    email, name
                }
            if (results.user) {
                results.user.updateProfile({
                    displayName: name
                })
            }
            firebase.firestore().collection("users")
                .doc(uid).set(data).then(r => console.log('Successfully Registered.'))
        }).catch(function (error) {
            alert(error.message())
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{flex: 1, width: '100%'}}
                    keyboardShouldPersistTaps="always">
                    <Image
                        style={styles.logo}
                        source={require('../../assets/signup.png')}
                    />
                    <TextInput style={styles.input}
                               placeholder='Full Name'
                               placeholderTextColor="#aaaaaa" onChangeText={(name) => this.setState({name})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none" required/>
                    <TextInput style={styles.input}
                               placeholder='E-mail'
                               placeholderTextColor="#aaaaaa" onChangeText={(email) => this.setState({email})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none" required/>
                    <TextInput style={styles.input}
                               placeholderTextColor="#aaaaaa"
                               secureTextEntry
                               placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none" required/>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm Password'
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button} onPress={() => this.SignUp()}><Text style={styles.buttonTitle}>Create
                        account</Text></TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already got an account? <Text
                            onPress={() => this.props.navigation.navigate('Login')} style={styles.footerLink}>Log
                            in</Text></Text>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default Register
