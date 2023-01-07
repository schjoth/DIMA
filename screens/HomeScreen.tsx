import { StyleSheet, Alert, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { AuthContext } from "../components/AuthContext";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";
import { GameMode } from "../components/game/enums";
import { getPlaylist } from "../api/questions";

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	const { userToken, setUserToken } = useContext(AuthContext);
	useEffect(() => {
		if (!userToken) navigation.navigate("Login");
	}, [userToken]);

	useEffect(() => {getPlaylist(userToken)}, [userToken]);

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
					onPress={() => setUserToken("")}
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
