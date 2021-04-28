import React, {Component} from 'react'
import {View, Button, TextInput} from "react-native-web";
import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
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
        firebase.auth().createUserWithEmailAndPassword(email, password).then(results => console.log(results)).catch(error => console.log(error));
    }

    render() {

        return (
            <View>
                <TextInput placeholder={this.state.name} onChangeText={(name) => this.setState({name})} required/>
                <TextInput placeholder="email" onChangeText={(email) => this.setState({email})} required/>
                <TextInput placeholder="password" secureTextEntry={true}
                           onChangeText={(password) => this.setState({password})} required/>
                <Button onPress={() => this.SignUp()} title="Sign Up"/>
            </View>
        )
    }

}

export default Register
