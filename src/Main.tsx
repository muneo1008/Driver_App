
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import Main_List from './Main_List.tsx';
import Main_Setting from './Main_Setting.tsx';
function Main(): React.JSX.Element {
    console.log('--Main()');
    const BottomTab = createBottomTabNavigator();
    return(
      <BottomTab.Navigator>
        <BottomTab.Screen name="Main_List" component={Main_List}
                          options={{headerShown:false,
                              tabBarIcon: ({color,size})=>
                                (<Icon name="phone" size={size} color={color}/>)}}/>
        <BottomTab.Screen name="Main_Setting" component={Main_Setting}
                          options={{headerShown:true, title:'환경설정',
                              tabBarIcon: ({color,size})=>
                                (<Icon name="cog" size={size} color={color}/>)}}/>
      </BottomTab.Navigator>
    );
}

export default Main;
