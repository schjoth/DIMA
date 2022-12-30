import React, { useContext, useEffect } from "react";
import { RootStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { AuthContext } from "../components/AuthContext";
import SpotifyLogin from "../components/SpotifyLogin";
import { View, Text } from "../components/Themed";

const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
	const { userToken, setUserToken } = useContext(AuthContext);

	useEffect(() => {
		// get token from spotify
		const token = window.location.hash
			.substring(1)
			.split("&")
			.find((item) => item.startsWith("access_token="))
			?.split("=")[1];

		let timeout: NodeJS.Timeout;

		// if token exists, update context and navigate to root
		if (token) {
			setUserToken(token || "");
			timeout = setTimeout(() => navigation.navigate("Root"), 1500);
		}

		return () => timeout && clearTimeout(timeout);
	}, []);

	return (
		<View style={styles.container}>
			{userToken ? <Text>Login successful</Text> : <SpotifyLogin />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginScreen;
