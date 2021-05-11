import React, {Component} from 'react'
import 'react-native-gesture-handler'
import {Image, Text, TextInput, TouchableOpacity, View, Button} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'

import styles from './LoginStyles';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            photoUrl: '',
            email: 'dummy@dummy.com',
            password: 'Dummy@1'
        }
        this.SignIn = this.SignIn.bind(this)
    }

    SignIn() {
        //Code Goes Here
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((results) => {
                const uid = results.user.uid
                firebase.firestore().collection('users').doc(uid).get().then(firestoreDoc => {
                    if (!firestoreDoc.exists) {
                        alert('User does not exist anymore.')
                        return
                    }
                })
                // console.log(results)
            })
            .catch(error => console.log(error));
        // console.log(this.state)
    }

    signInWithGoogle = async () => {
       console.log("Google Sign in")
    }

    render() {

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{flex: 1, width: '100%'}}
                    keyboardShouldPersistTaps="always">
                    <Image
                        style={styles.logo}
                        source={require('../../assets/qr-code.png')}
                    />
                    <TextInput style={styles.input}
                               placeholder='E-mail'
                               placeholderTextColor="#aaaaaa" onChangeText={(email) => this.setState({email})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none"
                               required/>
                    <TextInput style={styles.input}
                               placeholderTextColor="#aaaaaa"
                               secureTextEntry
                               placeholder='Password'
                               onChangeText={(password) => this.setState({password})}
                               underlineColorAndroid="transparent"
                               autoCapitalize="none"
                               required/>
                    {/*<TouchableOpacity*/}
                    {/*    style={styles.button} onPress={() => this.SignIn()}> <Text style={styles.buttonTitle}>Log*/}
                    {/*    in</Text></TouchableOpacity>*/}
                    {/*<TouchableOpacity*/}
                    {/*    style={styles.button} onPress={() => this.signInWithGoogle()}> <Text*/}
                    {/*    style={styles.buttonTitle}>Sign In with Google</Text></TouchableOpacity>*/}
                    <View style={styles.footerView}>
                        {/*<Text style={styles.footerText}>Don't have an account? <Text*/}
                        {/*    onPress={() => this.props.navigation.navigate('Register')} style={styles.footerLink}>Sign*/}
                        {/*    up</Text></Text>*/}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default Login
