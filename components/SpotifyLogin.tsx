import React, { useCallback } from "react";
import { Alert, Linking } from "react-native";
import CustomButton from "./CustomButton";

const client_id = "d760e0ff5af14deab0c1384a48669a74",
	// Use this if testing in the web
	redirect_uri = "http://localhost:19006/login",
	// Use this if testing on mobile
	//redirect_uri = "exp://127.0.0.1:19000",
	//redirect_uri = "exp://192.168.1.140:19000",
	scope = [
		"user-read-private",
		"user-read-email",
		"user-top-read",
		"user-read-recently-played",
		"playlist-read-private",
		"user-library-read",
	],
	response_type = "token";

const uri = `https://accounts.spotify.com/authorize?
	client_id=${client_id}
	&redirect_uri=${redirect_uri}
	&response_type=${response_type}
	&scope=${scope.join("%20")}`;

const SpotifyLogin = () => {
	const handlePress = useCallback(async () => {
		// Checking if the link is supported for links with custom URL scheme.
		const supported = await Linking.canOpenURL(uri);

		if (supported) {
			// Opening the link with some app, if the URL scheme is "http" the web link should be opened
			// by some browser in the mobile
			await Linking.openURL(uri);
		} else {
			console.error("Can't open url");
			Alert.alert(`Don't know how to open this URL: ${uri}`);
		}
	}, [uri]);

	return <CustomButton onPress={handlePress} title={"Log in with Spotify"} />;
};

export default SpotifyLogin;
