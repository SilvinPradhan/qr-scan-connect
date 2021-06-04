import React, {useState} from 'react'
import {View, TextInput, Image, Button} from "react-native";
import firebase from 'firebase';

require("firebase/firestore");
require("firebase/firebase-storage")

export default function Save(props) {
    console.log(props)
    const [caption, setCaption] = useState("");
    const uploadImage = async () => {
        const uri = props.route.params.image;
        const response = await fetch(uri)
    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri: uri}}/>
            <TextInput placeholder="Write a Caption for the post." onChangeText={(caption) => setCaption(caption)}/>
            <Button title={"Save"} onPresss={() => uploadImage()}/>
        </View>
    )
}
