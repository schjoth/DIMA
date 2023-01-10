import { QuestionTypes } from "./enums";

export type QuestionData = {
	question: QuestionTypes;
	hint: string;
	answers: string[];
	correctAnswer: string;
};

export type Questions = QuestionData[];
