import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    },
    board: {
        alignItems: "center",
        height: "70%",
        width: "90%",
        justifyContent: "center",
        backgroundColor:"#D9D9D9",
        borderRadius:25
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1DB954",
    },
    rank:{
        color: "#1DB954",
        borderRadius:25,
        width: 125,
        height: 25,
    },
    rankContainer:{
        color:"#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 200,
        left: 1,
        top: 1,
        borderRadius:25,
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

export default styles;

  