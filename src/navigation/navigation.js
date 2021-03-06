
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { userDataWithToken, userLogin } from '../stores/actions/user.action';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import Home from '../screens/Home/Home.screen'
import Login from '../screens/Login/Login'
import SignUp from '../screens/SignUp/SignUp'
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Notification from '../screens/Notification/Notification';
import BeerMenu from '../screens/BeerMenu/BeerMenu'
import QRScaner from '../screens/QRScaner/QRScaner';
import { NavigationContainer } from '@react-navigation/native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
  useDrawerStatus,
} from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomDrawer } from './drawer-navigator/drawer-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'

import Animated from 'react-native-reanimated';
import MyDrawer from '../navigation/drawer-navigator/drawer-navigator';
import { users } from '../stores/actions/user.action';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator()

const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator();



// const Screens = ({ navigation, style }) => {
//   const progress = useDrawerProgress();

//   // const scale = Animated.interpolate(progress, {
//   //   inputRange: [0, 1],
//   //   outputRange: [1, 0.9],
//   // });
//   // const borderRadius = Animated.interpolate(progress, {
//   //   inputRange: [0, 1],
//   //   outputRange: [0, 30],
//   // });

//   // const animatedStyle = {borderRadius, transform: [{scale}]};
//   return (
//     <Animated.View
//     // style={StyleSheet.flatten([styles.stack, animatedStyle])}
//     // style={animatedStyle}
//     >
//       <DrawerStack.Navigator
//         screenOptions={{
//           headerTransparent: true,
//           headerTitle: null,
//           headerShown: false,
//         }}
//         headerMode="none">


//         <DrawerStack.Screen name="Home">{props => <Home {...props} />}</DrawerStack.Screen>

//       </DrawerStack.Navigator>
//     </Animated.View>
//   );
// };

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} />}
//       drawerContentOptions={{
//         itemStyle: { marginVertical: 8, marginHorizontal: 8 },
//       }}
//       screenOptions={{
//         drawerType: 'slide',
//         headerShown: false,
//         drawerStyle: {
//           width: "70%",
//         },
//       }}
//       initialRouteName="Home"
//       overlayColor="transparent"
//       drawerType="front">
//       {/* <Drawer.Screen name="Home" component={Home} /> */}

//       <Drawer.Screen name="Screens" options={{headerShown: false}}>
//           {props => <Screens {...props} />}
//         </Drawer.Screen>
//     </Drawer.Navigator>
//   );
// }

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
}


function AppStackNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <AppStack.Screen name="Home" component={MyDrawer} />
      <AppStack.Screen name="BeerMenu" component={BeerMenu} />
      <AppStack.Screen name="QRScaner" component={QRScaner} />
      <AppStack.Screen name="Notification" component={Notification} />
    </AppStack.Navigator>
  )
}
// const MainNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//           name="AuthStackNavigator"
//           options={{ headerShown: false }}
//           component={AuthStackNavigator}
//         />
//         <Stack.Screen
//           name="AppStackNavigator"
//           options={{ headerShown: false }}
//           component={AppStackNavigator}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
function MainNavigation({ user, userLogin }) {
  const [tokenData , settokenData] = useState();
  const [isMount , setisMount] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorageLib.getItem("token");
        settokenData(token);
        dispatch(userDataWithToken(token))
      } catch (e) {
        // Restoring token failed
      }
      setTimeout(() => {
        setisMount(true)
      }, 1500)
    };
    bootstrapAsync();
  }, []);
  // return (
  //   <Stack.Navigator initialRouteName="Login"  screenOptions={{headerShown:false}} sdetachInactiveScreens={true}>
  //     {user.loggedin ? <Stack.Screen name="MainDrawer" component={MainDrawer} /> : <Stack.Screen name="Login" component={LoginStack} />}
  //   </Stack.Navigator>
  // );
  // const data = useSelector(state => state.userReducer.users)
  // console.log('Navigation ==============',data)

  const newData = useSelector((state) => state.userReducer.users)
  console.log('aaaaaa======= tokenData',tokenData, newData)

  return (
    <NavigationContainer  theme={{colors: {background: '#f8ece0'}}}>
     {isMount && <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={
        newData   ? 'AppStackNavigator' :'AuthStackNavigator'
}   >
 
     {!newData ? 
     <Stack.Screen
        name="AuthStackNavigator"
        options={{ headerShown: false }}
        component={AuthStackNavigator}
      />
       :
       <Stack.Screen
          name="AppStackNavigator"
          options={{ headerShown: false }}
          component={AppStackNavigator}/>}
      </Stack.Navigator>}
    </NavigationContainer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.users
  }
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ userLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);


const styles = StyleSheet.create({
  stack: {
    flex: 1,
    width: '100%',
    shadowColor: 'black',

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,

    // backgroundColor: 'white',
    overflow: 'hidden',
    // borderWidth: 1,
  },

});