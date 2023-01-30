import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
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
		<View style={localStyles.container}>
			
			<View style={localStyles.rankContainer}>
				{highscores.map((score, index) => (
					<View
						key={index}
						style={[
							localStyles.column,
							highlightIndex === index
								? localStyles.highlight
								: {},
						]}>
							
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								//fontWeight: highlightIndex === index ? "bold" : "normal",
								color: highlightIndex === index ? black : green,
							}}>#{index + 1}</Text>

						<Text style={{ 
							fontSize: 20, 
							color: offWhite,
							}}>{score}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: black,
		paddingBottom: 70,
		paddingTop: 70,
	},
	rankContainer: {
		color: offWhite,
		alignItems: "center",
		justifyContent: "space-around",
		width: 200,
		height: 200,
		left: 1,
		top: 1,
		borderRadius: 25,
		backgroundColor: offWhite,
		padding: 10,
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
		backgroundColor: black,
	},
	highlight: {
		backgroundColor: green,
	},
});

export default Scoreboard;
