import {SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View,Alert} from 'react-native';
import React, {useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from  "./Api.tsx";


function Login(): React.JSX.Element {
    console.log('--Login()');
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [disable, setDisable] = useState(true);
  const [pwVisible, setPwVisible] = useState(false);

    const pwVisibleHandler = () => {
      setPwVisible(!pwVisible);
    };

    const onIdChange = (newId: string) => {
        newId && userPw ? setDisable(false) : setDisable(true);
        setUserId(newId);
    };
    const onPwChange = (newPw: string) => {
        newPw && userId ? setDisable(false) : setDisable(true);
        setUserPw(newPw);
    };
    const gotoRegister = ()=>{
        navigation.push('Register');
    };
    const gotoMain = ()=>{
        AsyncStorage.setItem('userId', userId)
          .then(()=>{
          navigation.push('Main');
        });
    };
  const gotoIntro2 = ()=>{
    navigation.push('Intro2');
  };
  const onLogin = async ()=>{
    let fcmToken = await AsyncStorage.getItem('fcmToken')||'';
    api.login(userId,userPw,`${fcmToken}`)
      .then(res=>{
        console.log('API login / data = ' + JSON.stringify(res.data[0]));
        let {code, message} = res.data[0];
        console.log('API login / code: ' + code + ' , message: ' + message);
        if(code == 0){
          gotoMain();
        }else{
          Alert.alert('오류',message, [{
            text:'확인',
            onPress: ()=> console.log('Cancel pressed'),
            style:'cancel',
          }]);
        }
      })
      .catch(err=> {
        console.log(JSON.stringify(err));
      });
  };
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <TouchableOpacity onPress={gotoIntro2}>
                <Icon name="drivers-license" size={80} color={'#3498db'}/>
              </TouchableOpacity>

            </View>
            <View style={[styles.container]}>
                <TextInput style={[styles.input]} placeholder={'아이디'}
                           onChangeText={onIdChange} />
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <TextInput style={styles.input} placeholder={'패스워드'}
                             onChangeText={onPwChange} secureTextEntry={!pwVisible}/>
                  {
                    pwVisible ? (
                      <TouchableOpacity onPress={pwVisibleHandler}>
                        <Icon name="eye-slash" size={30} color={'#3498db'} style={{paddingLeft:10}}/>
                      </TouchableOpacity>

                    ) : (
                      <TouchableOpacity onPress={pwVisibleHandler}>
                        <Icon name="eye" size={30} color={'#3498db'} style={{paddingLeft:10}}/>
                      </TouchableOpacity>
                    )
                  }
                </View>


            </View>
            <View style={styles.passwordContainer}>

            </View>

            <View style={styles.container}>
                <TouchableOpacity style={disable ? styles.buttonDisable : styles.button}
                                  disabled={disable} onPress={onLogin}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {marginTop:5}]} onPress={gotoRegister}>
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>



    );
}

const styles = StyleSheet.create({
    textBlack: {
        fontSize:18,
        color: 'black',
    },
    textBlue:{
        fontSize:18,
        color:'blue',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
    },
    input:{
      width:'70%',
      height:40,
      borderWidth:1,
      borderColor:'gray',
      marginVertical:10,
      padding:10,
    },
    button: {
        width: '70%',
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDisable:{
      width:'70%',
      backgroundColor: 'gray',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign:'center',
    },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Login;
