import React, {Component} from 'react'
import {Text, View, Button} from "react-native";
import firebase from "firebase";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../../redux/actions";

export class Profile extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }

    const
    logOut = () => {
        firebase.auth().signOut().then(() => console.log('Successfully signed out.'))
    }

    render() {
        const {currentUser} = this.props;
        console.log(currentUser)
        if(currentUser==undefined) {
            return (<View></View>)
        }
        return (
            <View>
                <Text style={{flex: 1, justifyContent: 'center'}}>Welcome, {currentUser.name}</Text>
                <Button title="Logout" onPress={this.logOut}></Button>
            </View>
        )
    }

}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
