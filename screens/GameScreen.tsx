import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { fetchQuestions } from "../api/questions";
import { AnswerStatus, GameMode } from "../components/game/enums";
import Question from "../components/game/Question";
import { QuestionData, Questions } from "../components/game/types";
import { RootStackScreenProps } from "../types";
import { AuthContext } from "../components/AuthContext";
import { Text } from "../components/Themed";
import { View } from "react-native";
import styles, { black } from "../styles/styles";

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

	const [score, setScore] = useState<number>(0);
	//only used for Rush mode
	const [remainingTime, setRemainingTime] = useState<number>(60);

	const { clientToken, userToken } = useContext(AuthContext);
	useEffect(() => {
		fetchQuestions({ clientToken, userToken }).then((questions) => {
			setQuestions(questions);
		});
	}, []);

	const isFinalQuestion = useMemo(
		() => questionIndex === questions.length - 1 && mode !== GameMode.Rush,
		[questionIndex, questions.length, mode]
	);

	const gameOver = useCallback(() => {
		navigation.navigate("Result", { mode, score });
	}, [mode, score]);

	const onAnswer = useCallback((status: AnswerStatus) => {
		if (status === AnswerStatus.Correct) {
			console.log("Correct!");
			setScore((score) => score + 1);
		}
	}, []);

	const nextQuestion = useCallback(() => {
		if (isFinalQuestion) {
			return gameOver();
		}
		return setQuestionIndex((index) => index + 1);
	}, [questionIndex, questions.length, gameOver, isFinalQuestion]);

	//Reduce timer for rush mode
	useEffect(() => {
		//this stops the timer from counting down when the game is over
		if (remainingTime <= 0) return;

		if (mode === GameMode.Rush) {
			const interval = setInterval(() => {
				setRemainingTime((time) => time - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [remainingTime]);

	//End game when timer is 0
	useEffect(() => {
		if (remainingTime === 0) {
			gameOver();
		}
	}, [remainingTime]);

	if (currentQuestion === undefined) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={{ backgroundColor: black }}>
			<Text style={[styles.title, { textAlign: "center" }]}>
				{mode === GameMode.Rush
					? remainingTime
					: "Question: " +
					  (questionIndex + 1) +
					  "/" +
					  questions.length}
			</Text>
			<Question
				key={questionIndex}
				index={questionIndex}
				data={currentQuestion}
				nextQuestion={nextQuestion}
				onAnswer={onAnswer}
				isFinalQuestion={isFinalQuestion}
			/>
		</View>
	);
};

export default GameScreen;
