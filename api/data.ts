export type Song = {
	track: string;
	artists: string[];
	albumName: string;
};

export const convertToSong = (rawData: any): Song => {
	return {
		track: rawData.name,
		artists: rawData.artists.map((artist: any) => artist.name),
		albumName: rawData.album.name,
	};
};