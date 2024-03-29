import { GameMode, QuestionTypes } from "../components/game/enums";
import { Questions } from "../components/game/types";
import { convertToSong, Song } from "./data";
import { pickRandomSongs } from "./utils";

type Credentials = {
	clientToken: string;
	userToken: string;
	mode: GameMode;
};

type UserFavoritesParams = {
	userToken: string;
	// type: "tracks";
	type: "artists" | "tracks";
	timeRange?: "long_term" | "medium_term" | "short_term";
	limit?: number;
	offset?: number;
};

//currently only implemented for tracks
const getUserFavorites = async ({
	userToken,
	type = "tracks",
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
		const rawData = await response.json();

		if (rawData) {
			// this only supports track and not for artists
			return rawData.items.map((song: any) => convertToSong(song));
		}
	} catch (e) {
		console.log("Error occured during fetching user preferenes: ", e);
	}
	return [];
};

const getArtistsSongs = async ({
	userToken,
	artistId,
}: {
	userToken: string;
	artistId: string;
}): Promise<Song[]> => {
	const settings = {
		headers: { Authorization: "Bearer " + userToken },
	};

	try {
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IT`,
			settings
		);
		const rawData = await response.json();

		if (rawData) {
			return rawData.tracks.map((song: any) => convertToSong(song));
		}
	} catch (e) {
		console.log("Error occured during fetching user preferenes: ", e);
	}
	return [];
};

export const fetchQuestions = async ({
	clientToken,
	userToken,
	mode,
}: Credentials): Promise<Questions> => {
	const usersTopSongs = await getUserFavorites({
		userToken,
		type: "tracks",
	});

	if (mode === GameMode.OddOneOut) {
		const songs = pickRandomSongs(10, usersTopSongs);
		const allWrongAnswers: string[] = [];

		for (let i = 0; i < songs.length; i++) {
			let artistSongs = await getArtistsSongs({
				userToken,
				artistId: songs[i].artistsIds[0],
			});
			let randomSongs = pickRandomSongs(3, artistSongs);
			for (let j = 0; j < randomSongs.length; j++) {
				allWrongAnswers.push(randomSongs[j].track);
			}
		}

		const getWrongAnswers = (song: Song) => {
			let wrongAnswers: string[] = [];
			let i = 0;

			// The for loop saves the index of the current song in the array
			for (i = 0; i < songs.length; i++) {
				if (song.track === songs[i].track) {
					break;
				}
			}

			// Then uses it to get the correct 3 wrong answers from the wrong answers array
			for (let j = 0; j < 3; j++) {
				wrongAnswers.push(allWrongAnswers[i * 3 + j]);
			}
			return wrongAnswers;
		};

		const getCorrectAnswer = (song: Song) => {
			let correctAnswer: string = "";
			let temp: string = "";
			let currentArtist = song.artists[0];
			let randomSong;

			do {
				randomSong = pickRandomSongs(1, usersTopSongs)[0];
				temp = randomSong.artists[0];
			} while (temp === currentArtist);
			correctAnswer = randomSong.track;
			return correctAnswer;
		};

		const questions: Questions = songs.map((song) => ({
			question: QuestionTypes.WhichSongNotWrittenByArtist,
			hint: song.artists[0],
			answers: getWrongAnswers(song),
			correctAnswer: getCorrectAnswer(song),
		}));

		return Promise.resolve(questions);
	} else {
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
	}
};
