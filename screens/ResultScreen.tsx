import React from "react";
import { RootStackScreenProps } from "../types";

const ResultScreen: React.FC<RootStackScreenProps<"Result">> = ({
	navigation,
	route: {
		params: { mode, score },
	},
}) => {
	//TODO: fetch highscores
	//see if new score is a highscore
	//update highscores
	//display new highscores

	return <></>;
};

export default ResultScreen;
