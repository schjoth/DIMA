import { Song } from "./data";

export const pickRandomSongs = (amount: number, pool: Song[]): Song[] => {
	const songs: Song[] = [];

	while (songs.length < amount) {
		let randomSong = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
		songs.push(randomSong);
	}

	return songs;
};
