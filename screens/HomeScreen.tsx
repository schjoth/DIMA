import { StyleSheet, Alert, SafeAreaView, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";
import { RootStackScreenProps } from "../types";

type Props = RootStackScreenProps<"Home">;

const HomeScreen = ({ navigation }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigation}>
				<WelcomeTitle />
				<CustomButton
					variant="play"
					title="Play"
					onPress={() => navigation.navigate("Modal")}
				/>

				<CustomButton
					title="Scoreboard"
					onPress={() => navigation.navigate("Scoreboard")}
				/>
				<CustomButton
					variant="secondary"
					title="Log out"
					onPress={() => Alert.alert("Simple Button pressed")}
				/>
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
	navigation: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: 300,
		backgroundColor: "#000",
		width: "100%",
	},
});

export default HomeScreen;
