import { Song } from "./data";

export const pickRandomSongs = (amount: number, pool: Song[]): Song[] => {
	const songs: Song[] = [];

	while (songs.length < amount) {
		let randomSong = pool[Math.floor(Math.random()) * pool.length];
		if (!songs.includes(randomSong)) {
			songs.push(pool[Math.round(Math.random() * pool.length)]);
		}
	}

	return songs;
};
