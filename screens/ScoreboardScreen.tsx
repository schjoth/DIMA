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
			<View style={[styles.container, { paddingTop: 80, paddingBottom: 80 }]}>
				<Text style={[styles.title, { fontSize: 30, fontWeight: "normal" }]}>Scoreboard</Text>
				<Text style={[styles.title, { paddingBottom:70 }]}>{mode}</Text>

				<Scoreboard highscores={highscores}/>

				<Text style={[styles.title, { paddingTop: 50 }]}></Text>

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
