import React, {Component} from 'react'
import {View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScanScreen from './home/Scan'
import ProfileScreen from './home/Profile'
import GenerateScreen from './home/Generate'

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux/actions";

const Tab = createBottomTabNavigator();

export class Home extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        const {currentUser} = this.props
        if (currentUser == undefined) {
            return <View></View>
        }
        return (
            <Tab.Navigator initialRouteName="Profile">
                <Tab.Screen name="Scan" component={ScanScreen} options={{
                    tabBarIcon: ({
                                     color, size
                                 }) => (<MaterialCommunityIcons name="qrcode-scan" color={color} size={26}/>)
                }}/>
                <Tab.Screen name="Generate" component={GenerateScreen} listeners={
                    ({navigation}) => ({
                        tabPress: event => {
                            event.preventDefault()
                        }
                    })
                } options={{
                    tabBarIcon: ({
                                     color, size
                                 }) => (<MaterialCommunityIcons name="plus-box" color={color} size={26}/>)
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({
                                     color, size
                                 }) => (<MaterialCommunityIcons name="face" color={color} size={26}/>)
                }}/>
            </Tab.Navigator>
        )
    }

}

const mapStateToProps = store => ({
        currentUser: store.userState.currentUser
    }

)
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchUser
    }
    , dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
