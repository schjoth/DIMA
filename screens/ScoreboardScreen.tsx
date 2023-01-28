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
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>Loading...</Text>
					<CustomButton
						variant="secondary"
						onPress={() => navigation.navigate("Home")}
						title="Continue"
					/>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={[styles.container, { paddingTop: 130, paddingBottom: 130 }]}>
				<Text style={[styles.title, { fontSize: 30, fontWeight: "normal" }]}>Scoreboard</Text>
				<Text style={styles.title}>{mode}</Text>

				<Scoreboard highscores={highscores} />

				<CustomButton
					title="Back"
					variant="secondary"
					onPress={() => navigation.navigate({
						name: "SelectGameMode",
						params: { redirectTo: "Scoreboard", text: "Choose game mode" },
					})
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ScoreboardScreen;
