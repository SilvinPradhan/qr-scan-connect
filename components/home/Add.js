import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Camera} from 'expo-camera';

export default function Add() {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

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
            <View style={styles.cameraContainer}>
                <Camera style={styles.fixedRatio} type={type} ratio={'4:3'} ref={ref => setCamera(ref)}/>
            </View>
            <Button
                style={styles.button}
                title="Flip Camera"
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
            </Button>
            <Button title='Take Picture' onPress={() => takePicture()}/>
            {
                image && <Image source={{uri: image}} style={styles.captureImage}/>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
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
    }
});

