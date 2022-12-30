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
import { createRoot } from "react-dom/client";
import HomeScreen from "./ModalScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import styles from "../styles/styles";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
/*Husk å endre i types.tsx linje 16*/

const ModalScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Choose your quiz!</Text>
        </View>
        <Button
          title="Classic (time limit)"
          color="#1DB954"
          onPress={() => navigation.navigate("Home")}
        />

        <View>
          <Button
            title="Best of 10"
            color="#1DB954"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View>
          <Button
            title="Instant death"
            color="#1DB954"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View>
          <Button
            title="30s preview"
            color="#1DB954"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View>
          <Button
            title="Odd one out"
            color="#1DB954"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View>
          <Button
            title="Back"
            color="#D9D9D9"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ModalScreen;
