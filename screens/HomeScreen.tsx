import { StyleSheet, SafeAreaView, Alert } from "react-native";
import React from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";
import { GameMode } from "../components/game/enums";

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigation}>
				<WelcomeTitle />
				<CustomButton
					variant="play"
					title="Play"
					onPress={() =>
						navigation.navigate({
							name: "Game",
							params: { mode: GameMode.Default },
						})
					}
				/>
				<CustomButton
					title="Scoreboard"
					onPress={() => Alert.alert("Simple Button pressed")}
				/>
				<CustomButton
					title="Settings"
					onPress={() => Alert.alert("Simple Button pressed")}
				/>
				<CustomButton
					title="Log out"
					variant="secondary"
					onPress={() => Alert.alert("Simple Button pressed")}
				/>
			</View>
		</SafeAreaView>
	);
}

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
	playButton: {},
	button: {
		backgroundColor: "#1DB954",
		borderRadius: 30,
	},
});
