import React,{useEffect} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    BackHandler
} from 'react-native'
import { connect, useDispatch,useSelector} from 'react-redux'
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PointCard from '../../components/PointCard/PointCard';
import { MyPurchases } from '../../stores/actions/user.action';
const MyPurchase = ({ navigation, user }) => {
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(MyPurchases())
    }, [])
  
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        )
    
        return () => backHandler.remove()
      }, [])
    
      const backAction = () => {
        if (navigation.isFocused()) {
            navigation.navigate('HomeDrawer')
          return true
        } else {
          return false
        }
      }

    const data = useSelector(state => state.userReducer.MyPurchases)

    return (
        <>
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor={'#20382b'} /> */}
            <View style={styles.header}>
            <AntDesign onPress={() => navigation.navigate('HomeDrawer')} name='arrowleft' size={23} color={'#85786f'} />
            <Text style={styles.text1}>My Purchases</Text>
            </View>      
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ paddingHorizontal: 20,flex:1,flexGrow:1 }}>
                    { 
                    data?.data?.map((item) => {
                        return(
                            <View style={{ paddingVertical: 6 }}>
                            <PointCard
                                number={item.product.id}
                                title={item.product.name}
                                point={item.product.price}
                                percentage={item.product.alcohol_percentage}
                                date={item.created_at}
                            />
                        </View>
                        )
                    })
                    }
                   
                </View>
                </ScrollView>
           
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
    container:{
        flex:1,
        backgroundColor: "#f8ece0",
    },
    header:{
        flexDirection:"row",
        paddingTop:"13%",
        paddingHorizontal:10,
        paddingBottom:24
    },
    text1:{
        color:"#000000",
        paddingLeft:15,
        fontSize:18,
        fontFamily:"Oswald-Medium",
        bottom:4
    },
    footer:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"#f8ece0",
        paddingVertical:10
    },
    text2:{
        fontSize:30,
        color:"#ffffff",
        fontWeight:"bold"
    },
    myPoint:{
        width:32,
        height:32,
        marginTop:8
    }
})
export default connect(mapStateToProps, null)(MyPurchase)