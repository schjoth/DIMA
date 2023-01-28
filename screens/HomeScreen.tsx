import { StyleSheet, Alert, SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import WelcomeTitle from "../components/WelcomeTitle";
import { RootStackScreenProps } from "../types";
import { AuthContext } from "../components/AuthContext";

type Props = RootStackScreenProps<"Home">;

const HomeScreen = ({ navigation }: Props) => {
	const { userToken, setUserToken } = React.useContext(AuthContext);

	useEffect(() => {
		if (userToken === "") {
			navigation.navigate("Login");
		}
	}, [userToken]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigation}>
				<WelcomeTitle />
				<CustomButton
					variant="play"
					title="Play"
					onPress={() =>
						navigation.navigate({
							name: "SelectGameMode",
							params: { redirectTo: "Game", text: "Choose your quiz!" },
						})
					}
				/>

				<CustomButton
					title="Scoreboard"
					onPress={() =>
						navigation.navigate({
							name: "SelectGameMode",
							params: { redirectTo: "Scoreboard", text: "Choose game mode" },
						})
					}
				/>
				<CustomButton
					variant="secondary"
					title="Log out"
					onPress={() => setUserToken("")}
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
