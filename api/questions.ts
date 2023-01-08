import { Questions } from "../components/game/types";
import { authorize } from "./auth";

type Credentials = {
	clientToken: string;
	userToken: string;
};

export const fetchQuestions = async ({
	clientToken,
	userToken,
}: Credentials): Promise<Questions> => {
	//TODO: Implement logic here


	 const getTopTracks = async (token: String) => {
		const settings = {
		headers: {'Authorization': 'Bearer ' + token}
		}
		console.log(token);
		const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=5`, settings);
		const data = await response.json()
		return data;
		}

		const topTracks = getTopTracks(userToken);
		console.log(topTracks);


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
