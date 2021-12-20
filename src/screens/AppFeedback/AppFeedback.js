import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PointCard from '../../components/PointCard/PointCard';
const AppFeedback = ({ navigation, user }) => {
    const dispatch = useDispatch()

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                    <Text style={styles.feedback}>App Feedback</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingTop: "12%" }}>
                    <Input
                        inputContainerStyle={styles.borderdv}
                        //  onFocus={()=>setToggleUser4(1)}
                        //  onBlur={()=>setToggleUser4(0)}
                        style={styles.email}
                        labelStyle={styles.label}
                        label="First Name"
                        placeholder='Edward Davidson'
                        placeholderTextColor="#000000"
                    />
                    <Input
                        inputContainerStyle={styles.borderdv}
                        //  onFocus={()=>setToggleUser4(1)}
                        //  onBlur={()=>setToggleUser4(0)}
                        style={styles.email}
                        labelStyle={styles.label}
                        label="Subject"
                        placeholder='edwardd@gmail.com'
                        placeholderTextColor="#000000"
                    />
                    <Input
                        inputContainerStyle={styles.borderdv}
                        //  onFocus={()=>setToggleUser4(1)}
                        //  onBlur={()=>setToggleUser4(0)}
                        style={styles.email}
                        labelStyle={styles.label}
                        label="Message"
                        placeholderTextColor="#000000"
                        placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.btn}>
                    <Text style={styles.text}>Submit</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.users
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8ece0"
    },
    header: {
        flexDirection: "row",
        paddingTop: "16%",
        paddingHorizontal: 10
    },
    feedback: {
        paddingLeft: 15,
        color: "#000000",
        fontSize: 20,
        fontFamily:"Oswald-Medium",
        bottom:5
    },
    email: {
        paddingLeft: 2,
        fontSize: 12,
        color: "#000000",
        top: 6,
        fontFamily:"Oswald-Regular"
    },
    borderdv: {
        borderBottomColor: "#e1d5c9",
    },
    label: {
        color: "#e84a03",
        paddingLeft: 2,
        fontSize: 12,
        top: 14,
        fontFamily:"Oswald-Regular"
    },
    footer:{
        width:"100%",
        height:"50%",
        justifyContent:"center",
        
    },
    btn:{
        backgroundColor:"#e74a07",
        marginHorizontal:20,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:12,
        borderRadius:12
    },
    text:{
        color:"#ffffff",
        fontSize:18,
        fontFamily:"Oswald-Medium"

    }
})
export default connect(mapStateToProps, null)(AppFeedback)