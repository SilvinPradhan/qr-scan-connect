import {StatusBar} from 'expo-status-bar'
import React, {useRef} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import {Camera} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import IonIcon from "react-native-vector-icons/Ionicons";
import {MaterialCommunityIcons} from "@expo/vector-icons";

let camera = Camera
export default function Add({navigation}) {
    const ref = useRef(null);
    const [startCamera, setStartCamera] = React.useState(false)
    const [startGallery, setStartGallery] = React.useState(false)
    const [previewVisible, setPreviewVisible] = React.useState(false)
    const [capturedImage, setCapturedImage] = React.useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = React.useState('off')

    const __startCamera = async () => {
        // Permission for the use of camera
        const cameraStatus = await Camera.requestPermissionsAsync()
        console.log(cameraStatus.status)
        if (cameraStatus.status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
        //    Permission for the use of Image Picker

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus.status !== 'granted') {
            setStartGallery(true)
        }
    }

    const __takePicture = async () => {
        if (camera) {
            const photo = await ref.current.takePictureAsync(null)
            console.log(photo.uri)
            setPreviewVisible(true)
            //setStartCamera(false)
            setCapturedImage(photo)
            console.log('Photo set below');
            console.log(photo)
        }
    }
    const __savePhoto = () => {
        navigation.navigate('Save', {capturedImage})
    }
    const __saveToGallery = async () => {
        // const {status} = Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    const __retakePicture = async () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        await __startCamera()
    }
    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }
    const __switchCamera = () => {
        if (cameraType === Camera.Constants.Type.back) {
            setCameraType(Camera.Constants.Type.front)
        } else {
            setCameraType(Camera.Constants.Type.back)
        }
    }

    const __pickImage = async () => {
        let photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        }, (response) => {
            console.log('Response = ', response)
        });

        console.log(photo);

        if (!photo.cancelled) {
            setPreviewVisible(true)
            setCapturedImage(photo);
        }
    };

    return (
        <View style={styles.container}>
            {startCamera ? (
                <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                >
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture}
                                       pickImage={capturedImage}/>
                    ) : (
                        <Camera
                            type={cameraType}
                            flashMode={flashMode}
                            style={{flex: 1}}
                            ref={
                                ref}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: '5%',
                                        top: '10%',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={__handleFlashMode}
                                        style={{
                                            backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                                            borderRadius: '50%',
                                            height: 25,
                                            width: 25
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >
                                            ⚡️
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={__switchCamera}
                                        style={{
                                            marginTop: 20,
                                            borderRadius: '50%',
                                            height: 25,
                                            width: 25
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20
                                            }}
                                        >
                                            {cameraType === Camera.Constants.Type.front ? '🤳' : '📷'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        flexDirection: 'row',
                                        flex: 1,
                                        width: '100%',
                                        padding: 20,
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View
                                        style={{
                                            alignSelf: 'center',
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={__takePicture}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                bottom: 0,
                                                borderRadius: 50,
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                        <TouchableOpacity onPress={() => __pickImage()} style={{
                                            width: 130,
                                            height: 40,
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            bottom: 0
                                        }}>
                                            <IonIcon name="image-outline" size={13} color="#fff"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Camera>
                    )}
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={__startCamera}
                        style={{
                            width: 130,
                            borderRadius: 4,
                            backgroundColor: '#14274e',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Take picture
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <StatusBar style="auto"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const CameraPreview = ({photo, retakePicture, savePhoto, pickImage}) => {
    console.log('sdsfds', photo)
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ImageBackground
                source={{uri: (photo || pickImage) && (photo.uri || pickImage)}}
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 15,
                        justifyContent: 'flex-end'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                onPress={retakePicture}
                                style={{
                                    width: 130,
                                    height: 40,

                                    alignItems: 'center',
                                    borderRadius: 4
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 20
                                    }}
                                >
                                    Re-take
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={savePhoto}
                                style={{
                                    width: 130,
                                    height: 40,

                                    alignItems: 'center',
                                    borderRadius: 4
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 20
                                    }}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={savePhoto}
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons name="download" color="#fff"/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
