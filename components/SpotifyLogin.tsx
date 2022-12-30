import React from "react";
import { Linking, Pressable, Text } from "react-native";

const SpotifyLogin = () => {
	const client_id = "d760e0ff5af14deab0c1384a48669a74",
		redirect_uri = "http://localhost:19006",
		// scope = "user-read-private user-read-email",
		response_type = "token";

	const uri = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;

	return (
		<Pressable
			onPress={() => {
				Linking.openURL(uri);
			}}
		>
			<Text style={{ color: "#fff" }}>Log in with Spotify</Text>
		</Pressable>
	);
};

export default SpotifyLogin;
