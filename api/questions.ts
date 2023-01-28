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
	type?: "tracks";
	artistId?: string;
	//type: "artists" | "tracks";
	timeRange?: "long_term" | "medium_term" | "short_term";
	limit?: number;
	offset?: number;
};

//currently only implemented for tracks
const getUserFavorites = async ({
	userToken,
	artistId,
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
	type,
	timeRange = "long_term",
	limit = 10,
	offset = 0,
}: UserFavoritesParams): Promise<Song[]> => {
	const settings = {
		headers: { Authorization: "Bearer " + userToken },
	};

	try {
		console.log("Artist ID: ", artistId);
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IT`,
			settings
		);
		const rawData = await response.json();
		
		if (rawData) {
			// this only supports track and not for artists
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
}: Credentials): Promise<Questions> => {
	const usersTopSongs = await getUserFavorites({
		userToken,
		type: "tracks",
	});
  
	if (mode === GameMode.OddOneOut) {

		const songs = pickRandomSongs(5, usersTopSongs);
		const allWrongAnswers: string[] = [];

		for (let i = 0; i < songs.length; i++) {
			let artistSongs = await getArtistsSongs({
				userToken,
				artistId: songs[i].artistsIds[0],
			});
			let randomSongs = pickRandomSongs(3, artistSongs);
			//let randomSongs = ifDistinct(temp, artistSongs);
			console.log("Random songs: ", randomSongs);
			for (let j = 0; j < randomSongs.length; j++) {
				console.log("j = ", j);
				console.log("Random song: ", randomSongs[j].track);
				allWrongAnswers.push(randomSongs[j].track);
			}
			console.log("Calculated wrong answers.");
		};

		console.log("All wrong answers: ", allWrongAnswers);

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
			console.log("Wrong answers: ", wrongAnswers);
			return wrongAnswers;
		};

		const getCorrectAnswer = (song: Song) => {
			let correctAnswer: string = "";
			let temp : string = "";
			let currentArtist = song.artists[0];
			let randomSong;
			
			do {
				randomSong = pickRandomSongs(1, usersTopSongs)[0];
				temp = randomSong.artists[0];
			} while (temp === currentArtist);
			correctAnswer = randomSong.track
			console.log("Correct answer: ", correctAnswer);
			return correctAnswer;
		};

		const questions: Questions = songs.map((song) => ({
			question: QuestionTypes.WhichSongNotWrittenByArtist,
			hint: song.artists[0],
			answers: getWrongAnswers(song),
			correctAnswer: getCorrectAnswer(song),
		}));
    
    console.log("All questions generated.");
    
		return Promise.resolve(questions);
	}
	else if (mode === GameMode.Preview) {
		//implement gamemode preview
		return Promise.resolve([]);
	}
	else {

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
