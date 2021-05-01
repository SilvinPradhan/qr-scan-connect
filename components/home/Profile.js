import React from 'react'
import {Text, View, Button} from "react-native";
import firebase from "firebase";

const Profile = () => {
    const logOut = () => {
        firebase.auth().signOut().then(() => console.log('Successfully signed out.'))
    }
    return (
        <View>
            <Text style={{flex: 1, justifyContent: 'center'}}>Welcome, Simran</Text>
            <Button title="Logout" onPress={() => logOut()}></Button>
        </View>
    )
}
export default Profile
