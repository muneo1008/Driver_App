import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register.tsx';
import Main from './Main';
import Intro from './Intro.tsx';
import Login from './Login.tsx';
import NickNameScreen from './Main_Setting_Nickname.tsx';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

messaging().setBackgroundMessageHandler( async remoteMessage => {
  console.log('background message = '+ remoteMessage);
});

function DriverApp(): React.JSX.Element {
    const Stack = createStackNavigator();
    const GetFcmToken = async ()=>{
      const fcmToken = await messaging().getToken()
      await AsyncStorage.setItem("fcmToken", fcmToken);
      console.log('fcmToken: ', fcmToken);
    };

  useEffect(() => {
    GetFcmToken();
    messaging().onMessage(remoteMessage=>{
      console.log('remoteMessage: '+JSON.stringify(remoteMessage));
      let title = '';
      let body = '';
      if(remoteMessage.notification && remoteMessage.notification.title){
        title = remoteMessage.notification.title;
      }
      if(remoteMessage.notification && remoteMessage.notification.body){
        body = remoteMessage.notification.body;
      }
      if(remoteMessage){
        Alert.alert(title,body,[{text:'확인',style:'cancel'}]);
      }
    });
  }, []);
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Intro" component={Intro}
                              options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login}
                              options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register}
                              options={{headerShown: true, title: '회원가입'}}/>
                <Stack.Screen name="Main" component={Main}
                              options={{headerShown: false}}/>
              <Stack.Screen name="Nickname" component={NickNameScreen}
                            options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default DriverApp;
