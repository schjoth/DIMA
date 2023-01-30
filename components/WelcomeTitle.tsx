import { Text, StyleSheet } from "react-native";
import { View } from "./Themed";

const WelcomeTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.base, styles.normal]}>Welcome to</Text>
      <Text style={[styles.base, styles.highlight, {paddingBottom: 50}]}>SpotiQuiz!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    textAlign: "center",
    fontWeight: "bold",
  },
  normal: {
    fontSize: 40,
    color: "#D9D9D9",
  },
  highlight: {
    fontSize: 46,
    color: "#1DB954",
  },
  container: {
    backgroundColor: "transparent",
  },
});

export default WelcomeTitle;
