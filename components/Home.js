import React, {Component} from 'react'
import {Text, View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = store => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = dispatch => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
