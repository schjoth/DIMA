export type Song = {
	track: string;
	artists: string[];
	artistsIds: string[];
	albumName: string;
};

export const convertToSong = (rawData: any): Song => {
	return {
		track: rawData.name,
		artists: rawData.artists.map((artist: any) => artist.name),
		artistsIds: rawData.artists.map((artist: any) => artist.id),
		albumName: rawData.album.name,
	};
};
