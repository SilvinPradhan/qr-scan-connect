import React, {useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import {AntDesign} from '@expo/vector-icons'
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import styles from './SplashStyles'
import {Animated} from "react-native";

// const CIRCLE_SIZE = 100;

const ShapeCircle = ({onPress, animatedValue}) => {
    const inputRange = [0, 0.001, 0.5, 0.501, 1];
    const containerBg = animatedValue.interpolate({
        inputRange,
        outputRange: ['#8f79f2', '#8f79f2', '#8f79f2', '#444', '#444']
    })
    const circleBg = animatedValue.interpolate({
        inputRange,
        outputRange: ['#444', '#444', '#444', '#8f79f2', '#8f79f2',]
    })
    return (
        <Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, {
            backgroundColor: containerBg
        }]}>
            <Animated.View style={[styles.circle, {
                backgroundColor: circleBg,
                transform: [
                    {
                        perspective: 400
                    },
                    {
                        rotateY: animatedValue.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ['0deg', '-90deg', '-180deg']
                        })
                    },
                    {
                        scale: animatedValue.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [1, 8, 1]
                        })
                    },
                    {
                        translateX: animatedValue.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ['0%', '50%', '0%']
                        })
                    }
                ]
            }]}>
                <TouchableOpacity onPress={onPress}>
                    <View style={[styles.circle, styles.circleButton]}>
                        <AntDesign name="arrowright" size={28} color={'white'}/>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}

export default function Splash({navigation}) {
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const animation = (toValue) => Animated.timing(animatedValue, {
        toValue,
        duration: 2000,
        useNativeDriver: false
    })
    const [index, setIndex] = useState(0)
    const onPress = () => {
        //    onPress code here
        setIndex(index === 1 ? 0 : 1)
        animation(index === 1 ? 0 : 1).start();
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' hidden={true}/>
            <ShapeCircle onPress={onPress} animatedValue={animatedValue}/>
            <Text style={styles.titleContainer}>FastConnect</Text>
            {/*<Button title={"PreRegister"} onPress={() => navigation.navigate('PreRegister')}/>*/}
            {/*<Button title={"Register"} onPress={() => navigation.navigate('Register')}/>*/}
            {/*<Button title={"Login"} onPress={() => navigation.navigate('Login')}/>*/}
        </View>
    )
}
