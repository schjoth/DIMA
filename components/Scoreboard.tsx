import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Highscores } from "../storage/highscores";
import styles, { black, green, offWhite } from "../styles/styles";

interface ScoreboardProps {
	highscores: Highscores;
	highlightIndex?: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
	highscores,
	highlightIndex,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Scoreboard</Text>
			<View style={localStyles.rankContainer}>
				{highscores.map((score, index) => (
					<View
						key={index}
						style={[
							localStyles.column,
							highlightIndex === index
								? localStyles.highlight
								: {},
						]}
					>
						<Text
							style={{
								color: highlightIndex === index ? black : green,
							}}
						>
							#{index + 1}
						</Text>
						<Text style={{ color: offWhite }}>{score}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const localStyles = StyleSheet.create({
	rankContainer: {
		color: offWhite,
		alignItems: "center",
		justifyContent: "center",
		width: 150,
		height: 200,
		left: 1,
		top: 1,
		borderRadius: 25,
	},
	column: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 25,
		height: 25,
		paddingHorizontal: 10,
	},
	highlight: {
		backgroundColor: green,
	},
});

export default Scoreboard;
