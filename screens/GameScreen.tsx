import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchQuestions } from "../api/questions";
import { GameMode } from "../components/game/enums";
import Question from "../components/game/Question";
import { QuestionData, Questions } from "../components/game/types";
import { Text } from "react-native";
import { RootStackScreenProps } from "../types";

const GameScreen: React.FC<RootStackScreenProps<"Game">> = ({
	navigation,
	route: {
		params: { mode },
	},
}) => {
	const [questions, setQuestions] = useState<Questions>([]);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const currentQuestion: QuestionData | undefined = useMemo(
		() => questions[questionIndex],
		[questions, questionIndex]
	);

	useEffect(() => {
		fetchQuestions().then((questions) => {
			console.log("test", questions);
			setQuestions(questions);
		});
	}, []);

	const isFinalQuestion = questionIndex === questions.length - 1;

	const nextQuestion = useCallback(() => {
		if (isFinalQuestion) {
			/*TODO navigatie to result page*/
			return alert("Game is over");
		}
		return setQuestionIndex((index) => index + 1);
	}, [questionIndex, questions.length]);

	if (currentQuestion === undefined) {
		return <Text>Loading...</Text>;
	}

	return (
		<Question
			key={questionIndex}
			index={questionIndex}
			data={currentQuestion}
			nextQuestion={nextQuestion}
			isFinalQuestion={isFinalQuestion}
		/>
	);
};

export default GameScreen;
