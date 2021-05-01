import React, {Component} from 'react'
import {View, Button, TextInput, Text} from "react-native";
import firebase from 'firebase'

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
        const {signedIn, email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((results) => {
                this.setState({signedIn: true, ...state})
                console.log(results)
            })
            .catch(error => console.log(error));
    }

    GoogleGo = async () => {
        //    Google Auth Provider - Sign in
    }

    render() {

        return (
            <View>
                <TextInput placeholder="email" onChangeText={(email) => this.setState({email})} required/>
                <TextInput placeholder="password" secureTextEntry={true}
                           onChangeText={(password) => this.setState({password})} required/>
                <Button onPress={() => this.SignIn()} title="Login"/>
                <Button onPress={() => this.GoogleGo()} title={"Google Sign In"}/>
                <Text>Do not have an account? <Button title="Register"
                                                      onPress={() => this.props.navigation.navigate('Register')}></Button></Text>
            </View>
        )
    }
}

export default Login
