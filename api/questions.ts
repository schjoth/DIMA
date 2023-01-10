import { QuestionTypes } from "../components/game/enums";
import { Questions } from "../components/game/types";
import { convertToSong, Song } from "./data";
import { pickRandomSongs } from "./utils";

type Credentials = {
	clientToken: string;
	userToken: string;
};

type UserFavoritesParams = {
	userToken: string;
	type: "tracks";
	// type: "artists" | "tracks";
	timeRange?: "long_term" | "medium_term" | "short_term";
	limit?: number;
	offset?: number;
};

//currently only implemented for tracks
const getUserFavorites = async ({
	userToken,
	type,
	timeRange = "long_term",
	limit = 50,
	offset = 0,
}: UserFavoritesParams): Promise<Song[]> => {
	const settings = {
		headers: { Authorization: "Bearer " + userToken },
	};

	try {
		const response = await fetch(
			`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
			settings
		);

		if (response) {
			const rawData = await response.json();

			// this only supports track and not for artists
			return rawData.items.map((song: any) => convertToSong(song));
		}
	} catch (e) {
		console.log("Error occured during fetching user preferenes: ", e);
	}
	return [];
};

export const fetchQuestions = async ({
	clientToken,
	userToken,
}: Credentials): Promise<Questions> => {
	const usersTopSongs = await getUserFavorites({
		userToken,
		type: "tracks",
	});

	const songs = pickRandomSongs(10, usersTopSongs);

	const getWrongAnswers = (song: Song) => {
		let wrongAnswers: string[] = [];
		while (wrongAnswers.length < 3) {
			let randomSong = pickRandomSongs(1, usersTopSongs)[0];
			let randomArtist = randomSong.artists[0];
			if (
				randomArtist !== song.artists[0] &&
				!wrongAnswers.includes(randomArtist)
			) {
				wrongAnswers.push(randomArtist);
			}
		}
		return wrongAnswers;
	};

	const questions: Questions = songs.map((song) => ({
		question: QuestionTypes.WhoMadeThisSong,
		hint: song.track,
		answers: getWrongAnswers(song),
		correctAnswer: song.artists[0],
	}));

	return Promise.resolve(questions);
};
