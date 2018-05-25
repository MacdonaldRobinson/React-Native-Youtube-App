import React from 'react';
import { ScrollView, View, Text, Button, TextInput, Image, Modal, TouchableHighlight, WebView } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import { HomeScreen } from './Screens/HomeScreen';
import { SettingsScreen } from './Screens/SettingsScreen';


const Navigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    Settings:{
        screen: SettingsScreen,
    }
});

export default class App extends React.Component 
{
  render() 
  {
    return (
        <Navigator />
    )
  }
}
