import {
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
  AppRegistry,
} from "react-native";
import { NativeRouter as Router, Route, Link } from "react-router-native";
import * as React from "react";
import { useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import styles from "../styles/styles";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to spotiQuiz!</Text>
        </View>

        <Button
          title="Play"
          color="#1DB954"
          onPress={() => navigation.navigate("Modal")}
        />

        <View>
          <Button
            title="Scoreboard"
            color="#1DB954"
            onPress={() => navigation.navigate("Scoreboard")}
          />
        </View>
        <View>
          <Button
            title="Log out"
            color="#D9D9D9"
            onPress={() => Alert.alert("Simple Button pressed")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
