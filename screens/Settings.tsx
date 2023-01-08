import {
    StyleSheet,
    Button,
    SafeAreaView,
  } from "react-native";
  import * as React from "react";
  import { Text, View } from "../components/Themed";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  
  type ProfileScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;
  
  type Props = {
    navigation: ProfileScreenNavigationProp;
  };
  /*Husk å endre i types.tsx linje 16*/
  
  const Settings = ({ navigation }: Props) => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1DB954",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
      color: "#1DB954",
    },
    header: {
      fontSize: 20,
    },
    subNavItem: {
      padding: 5,
    },
  });
  
  export default Settings;
  