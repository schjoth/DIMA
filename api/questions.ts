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


	 const getTopTracks = async (token: String) => {
		const settings = {
		headers: {'Authorization': 'Bearer ' + token}
		}
		const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=5`, settings);
		const data = await response.json()
		return data;
		}

		const topTracks =  await getTopTracks(userToken);

	const getSongInfo = () => {
		let items = new Array(topTracks.items);
		let songs = new Array();
		items.forEach((item) => 
		{
		item.forEach(i =>{
			
			let artistNames = "";
			i.artists.forEach((artist) =>{
				artistNames = artistNames + artist.name;
				if (i.artists.length > 1){
					artistNames = artistNames + ",";
				}
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

	const getRandomSongAndRemove = () => {
		let randomSong = test[Math.floor(Math.random())*test.length];
		for( var i = 0; i < test.length; i++){ 
			if ( test[i] === randomSong) { 
				test.splice(i, 1); 
			}
		}
		return randomSong;
	}


	const getWrongAnswers = () => {
		let wrongAnswers = [test[Math.floor(Math.random()*test.length)].artists, 
							test[Math.floor(Math.random()*test.length)].artists,
							test[Math.floor(Math.random()*test.length)].artists]
		return wrongAnswers;
	}



	const randomSong = getRandomSongAndRemove();
	const wrongAnswers = getWrongAnswers();
	const randomSong2 = getRandomSongAndRemove();
	const wrongAnswers2 = getWrongAnswers();
	const randomSong3 = getRandomSongAndRemove();
	const wrongAnswers3 = getWrongAnswers();
	const randomSong4 = getRandomSongAndRemove();
	const wrongAnswers4 = getWrongAnswers();
	const randomSong5 = getRandomSongAndRemove();
	const wrongAnswers5 = getWrongAnswers();
	const randomSong6 = getRandomSongAndRemove();
	const wrongAnswers6 = getWrongAnswers();
 



	let req = Promise.resolve([
		{
			question: "Who made " + randomSong.track + "?",
			hint: randomSong.albumName,
			answers: wrongAnswers,
			correctAnswer: randomSong.artists,
		},
		{
			question: "Who made " + randomSong2.track + "?",
			hint: randomSong2.albumName,
			answers: wrongAnswers2,
			correctAnswer: randomSong2.artists
		},
		{
			question: "Who made " + randomSong3.track + "?",
			hint: randomSong3.albumName,
			answers: wrongAnswers3,
			correctAnswer: randomSong3.artists
		},
		{
			question: "Who made " + randomSong4.track + "?",
			hint: randomSong4.albumName,
			answers: wrongAnswers4,
			correctAnswer: randomSong4.artists
		},
		{
			question: "Who made " + randomSong5.track + "?",
			hint: randomSong5.albumName,
			answers: wrongAnswers5,
			correctAnswer: randomSong5.artists
		},
		{
			question: "Who made " + randomSong6.track + "?",
			hint: randomSong6,
			answers: wrongAnswers6,
			correctAnswer: randomSong6.artists
		},
	] as Questions);

	return req;
};
