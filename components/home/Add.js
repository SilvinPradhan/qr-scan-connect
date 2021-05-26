import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Camera} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import {TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {ImageBackground} from "react-native-web";

export default function Add() {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [previewVisible, setPreviewVisible] = useState(false);

    useEffect(() => {
        (async () => {
            if (await Camera.isAvailableAsync()) {
                const {status} = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            }
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            // console.log(data.uri)
            setImage(data.uri)
            setPreviewVisible(true)
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            {/*<Button*/}
            {/*    style={styles.button}*/}
            {/*    title="Flip Camera"*/}
            {/*    onPress={() => {*/}
            {/*        setType(*/}
            {/*            type === Camera.Constants.Type.back*/}
            {/*                ? Camera.Constants.Type.front*/}
            {/*                : Camera.Constants.Type.back*/}
            {/*        );*/}
            {/*    }}>*/}
            {/*</Button>*/}
            <View style={styles.cameraContainer}>
                <Camera style={styles.fixedRatio} type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.cameraSecondary}>
                        <View style={styles.cameraTertiary}>
                            <TouchableOpacity style={styles.captureButton} onPress={() => takePicture()}/>
                        </View>
                    </View>
                </Camera>
            </View>
            <StatusBar style="auto"/>
            {/*<Button style={styles.flashModeButton}  />*/}
            {
                image && <Image source={{uri: image}} style={styles.captureImage}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1,
        width: '100%'
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    cameraSecondary: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    cameraTertiary: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    captureImage: {
        flex: 1
    },
    captureButton: {
        width: 40,
        height: 40,
        bottom: 0, borderRadius: 50,
        backgroundColor: '#fff'
    }
});

const CameraPreview = ({data}) => {
    console.log('data passed', data)
    return (
        <View style={{
            backgroundColor: 'transparent',
            flex: 1,
            width: '100%',
            height: '100%'
        }}>
            <ImageBackground source={{uri: data && data.uri}} style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end'}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity style={{width: 130, height: 40, alignItems: 'center', borderRadius: 4}}><Text
                            style={{color: '#fff', fontsize: 20}}>Re-Take</Text></TouchableOpacity>
                        <TouchableOpacity style={{width: 130, height: 40, alignItems: 'center', borderRadius: 4}}>
                            <Text style={{color: '#fff', fontSize: 20}}>Save Photo¬</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

