import { Questions } from "../components/game/types";
import song from "./test";

type Credentials = {
	clientToken: string;
	userToken: string;
};

type songInfo = {
	track: string;
	artists: string;
	albumName: string;
}




export const fetchQuestions = async ({
	clientToken,
	userToken,
}: Credentials): Promise<Questions> => {
	//TODO: Implement logic here


	 const getTopTracks = async (token: String) => {
		const settings = {
		headers: {'Authorization': 'Bearer ' + token}
		}
		//console.log(token);
		const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=5`, settings);
		const data = await response.json()
		return data;
		}

		const topTracks =  await getTopTracks(userToken);
		//console.log(topTracks);

	const getSongInfo = () => {
		let items = new Array(topTracks.items);
		let songs = new Array();
		//console.log(items);
		items.forEach((item) => 
		{
		item.forEach(i =>{
			
			let artistNames = "";
			i.artists.forEach((artist) =>{
				artistNames = artistNames + artist.name;
				if (i.artists.length > 1){
					artistNames = artistNames + ",";
				}
				//console.log(artistNames);
			})
			const convertData = (i: {
					album: {
						album_type: string; artists: { external_urls: { spotify: string; }; href: string; id: string; name: string; type: string; uri: string; }[]; available_markets: never[]; //api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=5`, settings);
						external_urls: { spotify: string; }; href: string; //console.log(topTracks);
						id: string; images: { height: number; url: string; width: number; }[]; name: string; release_date: string; release_date_precision: string; total_tracks: number; type: string; uri: string;
					}; artists: { external_urls: { spotify: string; }; href: string; id: string; name: string; type: string; uri: string; }[]; available_markets: never[]; disc_number: number; duration_ms: number; explicit: boolean; external_ids: { isrc: string; }; external_urls: { spotify: string; }; href: string; id: string; is_local: boolean; name: string; popularity: number; preview_url: null; track_number: number; type: string; uri: string;
				} | { album: { album_type: string; artists: { external_urls: { spotify: string; }; href: string; id: string; name: string; type: string; uri: string; }[]; available_markets: string[]; external_urls: { spotify: string; }; href: string; id: string; images: { height: number; url: string; width: number; }[]; name: string; release_date: string; release_date_precision: string; total_tracks: number; type: string; uri: string; }; artists: { external_urls: { spotify: string; }; href: string; id: string; name: string; type: string; uri: string; }[]; available_markets: string[]; disc_number: number; duration_ms: number; explicit: boolean; external_ids: { isrc: string; }; external_urls: { spotify: string; }; href: string; id: string; is_local: boolean; name: string; popularity: number; preview_url: string; track_number: number; type: string; uri: string; }): songInfo => ({
				track: i.name,
				artists: artistNames,
				albumName: i.album.name,
			})

			const infosong = convertData(i);
			console.log(infosong);
			songs.push(infosong);
			artistNames = "";
		})
		})
		return songs;
	}

	const test = getSongInfo();
	console.log(test);
	
		



	let req = Promise.resolve([
		{
			question: "Who made this song?",
			hint: "Ferrari",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Radioactive",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Telephone",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Mi fai impazzire",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Penger til grava",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Mockingbird",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
	] as Questions);

	return req;
};
