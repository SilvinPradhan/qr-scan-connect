import React, {Component} from 'react'
import {View, Button, TextInput, Text} from "react-native";
import firebase from 'firebase'

export class Register extends Component {
    constructor({props}) {
        super(props);
        this.state = {
            name: 'Dummy Pradhan',
            email: 'dummy@dummy.com',
            password: 'Dummy@1'
        }
        this.SignUp = this.SignUp.bind(this)
    }

    SignUp() {
        //Code Goes Here
        const {name, email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(results => {
            console.log(results)
            if (results.user) {
                results.user.updateProfile({
                    displayName: name
                })
            }
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid).set({
                name, email
            }).then(r => console.log('Successfully Registered.'))
        }).catch(function (error) {
            alert(error.message())
        });
    }

    render() {

        return (
            <View>
                <TextInput placeholder={this.state.name} onChangeText={(name) => this.setState({name})} required/>
                <TextInput placeholder="email" onChangeText={(email) => this.setState({email})} required/>
                <TextInput placeholder="password" secureTextEntry={true}
                           onChangeText={(password) => this.setState({password})} required/>
                <Button onPress={() => this.SignUp()} title="Sign Up"/>
                <Text>Already a FastConnect User?<Button
                    title='Login'
                    onPress={() => this.props.navigation.navigate('Login')}
                /></Text>
            </View>
        )
    }
}

export default Register
