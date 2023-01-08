import { Questions } from "../components/game/types";

type Credentials = {
	clientToken: string;
	userToken: string;
};

export const fetchQuestions = async ({
	clientToken,
	userToken,
}: Credentials): Promise<Questions> => {
	//TODO: Implement logic here

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
