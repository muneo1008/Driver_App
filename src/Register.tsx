import {SafeAreaView, Text, TouchableOpacity, TextInput, View, StyleSheet,Alert} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from './Api.tsx';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Register(): React.JSX.Element {
    console.log('--Register()');
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [PwCheck, setPwCheck] = useState('');
  const [pwVisible, setPwVisible] = useState(false);
  const [CheckPwVisible, setCheckPwVisible] = useState(false);
  const pwVisibleHandler = () => {
    setPwVisible(!pwVisible);
  };
  const CheckPwVisibleHandler = () => {
    setCheckPwVisible(!CheckPwVisible);
  };

  const onRegister = async ()=>{
    let fcmToken = await AsyncStorage.getItem('fcmToken')||'';
    api.register(userId,userPw,`${fcmToken}`)
      .then(res=>{
        let {code, message} = res.data[0];
        let title = "알림";
        if(code == 0){
          navigation.pop();
          console.log('API register / data = ' + JSON.stringify(res.data));
        }else {
          title = '오류';

        }
        Alert.alert(title, message, [{
          text:'확인',
          onPress:()=>console.log('cancel presses'),
          style:'cancel',
        }]);

      })
      .catch(err=>{
        console.log(JSON.stringify(err));
      });
  };

  const isDisable = () => {
    if(userId && userPw && PwCheck &&(userPw == PwCheck)){
      return false;
    }else{
      return true;
    }
  };

    return(
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, {justifyContent: 'flex-end'}]}>
              <Icon name="drivers-license" size={80} color={"#3498db"} />
            </View>
          <View style={[styles.container, {flex: 2}]}>
            <TextInput style={styles.input} placeholder={'아이디'} onChangeText={newID => setUserId(newID)}/>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <TextInput style={styles.input} placeholder={'패스워드'}
                         onChangeText={userPw => setUserPw(userPw)} secureTextEntry={!pwVisible}/>
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
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <TextInput style={styles.input} placeholder={'패스워드 확인'}
                         onChangeText={PwCheck => setPwCheck(PwCheck)} secureTextEntry={!CheckPwVisible}/>
              {
                CheckPwVisible ? (
                  <TouchableOpacity onPress={CheckPwVisibleHandler}>
                    <Icon name="eye-slash" size={30} color={'#3498db'} style={{paddingLeft:10}}/>
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity onPress={CheckPwVisibleHandler}>
                    <Icon name="eye" size={30} color={'#3498db'} style={{paddingLeft:10}}/>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View style={[styles.container, {justifyContent: 'flex-start'}]}>
            <TouchableOpacity style={isDisable()? styles.buttonDisable:styles.button} disabled={isDisable()} onPress={onRegister}>
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
});
export default Register;
