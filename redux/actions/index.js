import firebase from 'firebase'
import {USER_STATE_CHANGE, CLEAR_DATA} from "../constants/index";

export function clearAllData() {
    return ((dispatch) => {
        dispatch({
            type:CLEAR_DATA
        })
    })
}
export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    // console.log(snapshot.data())
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                } else {
                    console.log("Data for this user does not exist!")
                }
            })
    })
}
