
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation,useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

function Intro(): React.JSX.Element {
    console.log('--Intro()');

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    useFocusEffect(React.useCallback(()=>{
        setTimeout(async ()=>{
            let userId = await AsyncStorage.getItem('userId');
            let isAutoLogin = userId ? true : false;

            if(isAutoLogin){
                navigation.push('Main');
            }else{
                navigation.push('Login');
            }
        }, 1000);
    },[]));


    return(
        <SafeAreaView style={styles.container}>
            <Icon name="drivers-license" size={100} color={'#3498db'}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Intro;
