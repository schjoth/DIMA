import React from "react";
import { Linking } from "react-native";
import CustomButton from "./CustomButton";

const SpotifyLogin = () => {
	const client_id = "d760e0ff5af14deab0c1384a48669a74",
		redirect_uri = "http://localhost:19006/login",
		// scope = "user-read-private user-read-email",
		response_type = "token";

	const uri = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;

	return (
		<CustomButton
			onPress={() => Linking.openURL(uri)}
			title={"Log in with Spotify"}
		/>
	);
};

export default SpotifyLogin;
