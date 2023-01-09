import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { FC, useEffect, useState } from "react";
import styles from "../styles/styles";
import Scoreboard from "../components/Scoreboard";
import CustomButton from "../components/CustomButton";
import { fetchHighscores, Highscores } from "../storage/highscores";

const ScoreboardScreen: FC<RootStackScreenProps<"Scoreboard">> = ({
	navigation,
	route: {
		params: { mode },
	},
}) => {
	const [highscores, setHighscores] = useState<Highscores>();

	useEffect(() => {
		fetchHighscores(mode).then((highscores) => {
			setHighscores(highscores);
		});
	}, []);

	if (!highscores) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Loading...</Text>
				<CustomButton
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
					title="Continue"
				/>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Scoreboard highscores={highscores} />

				<CustomButton
					title="Back"
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ScoreboardScreen;
