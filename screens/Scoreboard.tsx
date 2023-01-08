import {
    StyleSheet,
    Button,
    SafeAreaView,
  } from "react-native";
  import * as React from "react";
  import { Text, View } from "../components/Themed";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import styles from "../styles/styles";
  
  type ProfileScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;
  
  type Props = {
    navigation: ProfileScreenNavigationProp;
  };
  /*Husk å endre i types.tsx linje 16*/
  
  const Scoreboard = ({ navigation }: Props) => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Scoreboard</Text>
            <View style={styles.rankContainer}>
                <Text style={styles.rank}>#1</Text>
                <Text style={styles.rank}>#2</Text>
                <Text style={styles.rank}>#3</Text>
                <Text style={styles.rank}>#4</Text>
                <Text style={styles.rank}>#5</Text>
                <Text style={styles.rank}>#6</Text>
            </View>
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
  
  
  export default Scoreboard;
  