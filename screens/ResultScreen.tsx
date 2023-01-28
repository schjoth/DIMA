import React, { FC, useEffect, useState } from "react";
import { saveHighscore, Highscores } from "../storage/highscores";
import styles, { black } from "../styles/styles";
import { RootStackScreenProps } from "../types";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Scoreboard from "../components/Scoreboard";

const ResultScreen: FC<RootStackScreenProps<"Result">> = ({
	navigation,
	route: {
		params: { mode, score },
	},
}) => {
	const [highscores, setHighscores] = useState<Highscores>();
	const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

	useEffect(() => {
		saveHighscore(mode, score).then((highscores) => {
			setHighscores(highscores);
			setIsLoadingComplete(true);
		});
	}, []);

	if (!isLoadingComplete) {
		return (
			<View style={localStyles.container}>
				<Text style={styles.title}>Loading...</Text>
				<CustomButton
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
					title="Continue"
				/>
			</View>
		);
	}

	if (highscores === undefined) {
		return (
			<View style={localStyles.container}>
				<Text style={styles.title}>
					An error occured while fetching privous highscores
				</Text>
				<CustomButton
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
					title="Continue"
				/>
			</View>
		);
	}

	return (
		<View style={localStyles.container}>
			<Text style={styles.title}>Your score: {score}</Text>

			<Text style={styles.title}>Highscores</Text>
			<Scoreboard
				highscores={highscores}
				highlightIndex={highscores.indexOf(score)}
			/>

			<CustomButton
				variant="secondary"
				onPress={() => navigation.navigate("Home")}
				title="Continue"
			/>
		</View>
	);
};

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: black,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ResultScreen;
