import { StyleSheet, Button, Alert, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { AuthContext } from "../components/AuthContext";

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	const { userToken } = useContext(AuthContext);

	useEffect(() => {
		if (!userToken) navigation.navigate("Login");
	}, [userToken]);

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<View style={styles.container}>
					<Text style={styles.title}>Welcome to spotiQuiz!</Text>
				</View>
				<View>
					<Button
						title="Play"
						color="#1DB954"
						onPress={() => Alert.alert("Simple Button pressed")}
					/>
				</View>

				<View>
					<Button
						title="Scoreboard"
						color="#1DB954"
						onPress={() => Alert.alert("Simple Button pressed")}
					/>
				</View>
				<View>
					<Button
						title="Settings"
						color="#1DB954"
						onPress={() => Alert.alert("Simple Button pressed")}
					/>
				</View>
				<View>
					<Button
						title="Log out "
						color="#D9D9D9"
						onPress={() => Alert.alert("Simple Button pressed")}
					/>
				</View>
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
});
