import React, {Component} from 'react'
import {View} from "react-native";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeedScreen from './home/Feed'
import ProfileScreen from './home/Profile'

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux/actions";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return (null)
}

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
            <Tab.Navigator initialRouteName="Profile" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} options={{
                    tabBarIcon: ({
                                     color, size
                                 }) => (<MaterialCommunityIcons name="home" color={color} size={26}/>)
                }}/>
                <Tab.Screen name="Post" component={EmptyScreen} listeners={
                    ({navigation}) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
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
