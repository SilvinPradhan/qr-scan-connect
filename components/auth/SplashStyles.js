import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    titleContainer: {
        color: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    circleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        paddingBottom: 100,
        backgroundColor: '#8f79f2'
    },
    circle: {
        backgroundColor: '#444',
        width: 100,
        height: 100,
        borderRadius: 50
    },
    circleButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
