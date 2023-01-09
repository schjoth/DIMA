import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameMode } from "../components/game/enums";

export type Highscores = number[];
const numberOfHighscores = 5;

export const fetchHighscores = async (mode: GameMode): Promise<Highscores> => {
	try {
		const highscores = await AsyncStorage.getItem(mode);
		if (highscores) {
			return JSON.parse(highscores) as Highscores;
		}
	} catch (e) {
		console.error("Error fetching highscores: ", e);
	}
	return fillEmptyScores([]);
};

export const saveHighscore = async (mode: GameMode, score: number) => {
	try {
		const highscores = await fetchHighscores(mode);
		if (highscores) {
			highscores.push(score);
			highscores.sort((a, b) => b - a);
			highscores.splice(numberOfHighscores);
			await AsyncStorage.setItem(mode, JSON.stringify(highscores));
			return fillEmptyScores(highscores);
		}
	} catch (e) {
		console.error("Error saving highscore: ", e);
	}
};

const fillEmptyScores = (highcores: Highscores) => {
	while (highcores.length < numberOfHighscores) {
		highcores.push(0);
	}
	return highcores;
};
