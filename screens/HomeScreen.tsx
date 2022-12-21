import { StyleSheet, Button, Alert, SafeAreaView, AppRegistry } from 'react-native';
import { NativeRouter as Router, Route, Link } from "react-router-native";
import * as React from 'react';
import { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createRoot } from 'react-dom/client';
import  ModalScreen  from './ModalScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style = {styles.container}>
<View>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to spotiQuiz!</Text>
    </View>
    <Button
        title="Play"
        color="#1DB954"
        onPress={() => () => navigation.navigate('Modal')}
      />

      <View>
      <Button
        title="Scoreboard"
        color="#1DB954"
        onPress={() => Alert.alert('Simple Button pressed') }
      />
      </View>
      <View>
      <Button
        title="Settings"
        color="#1DB954"
        onPress={() => Alert.alert('Simple Button pressed') }
      />
      </View>
      <View>
    <Button
        title="Log out "
        color="#D9D9D9"
        onPress={() => Alert.alert('Simple Button pressed') }
      />
      </View>
      </View>
    </SafeAreaView>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color: '#1DB954',
  },
  header: {
    fontSize: 20
  },
  subNavItem: {
    padding: 5
  },
});


export default HomeScreen;
