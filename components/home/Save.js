import React, {useState} from 'react'
import {View, TextInput, Image, Button} from "react-native";
import firebase from 'firebase';

require("firebase/firestore");
require("firebase/firebase-storage")

export default function Save(props) {
    console.log(props.route.params);
    const [caption, setCaption] = useState("");
    const uploadImage = async () => {
        const uri = props.route.params.capturedImage;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(childPath).put(blob);
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then(snapShot => {
                console.log(snapShot)
            })
        }
        const taskError = snapShot => {
            console.log(snapShot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri: uri}}/>
            <TextInput placeholder="Write a caption for the picture." onChangeText={(caption) => setCaption(caption)}/>
            <Button title={"Save"} onPresss={() => uploadImage()}/>
        </View>
    )
}
