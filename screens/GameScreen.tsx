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
import CustomButton from "../components/CustomButton";
import styles, { black } from "../styles/styles";

const GameScreen: React.FC<RootStackScreenProps<"Game">> = ({
	navigation,
	route: {
		params: { mode },
	},
}) => {
	const [questions, setQuestions] = useState<Questions>([]);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const [infiniteIndex, setInfiniteIndex] = useState<number>(0);
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
		() => questionIndex === questions.length - 1,
		[questionIndex, questions.length]
	);

	const gameOver = useCallback(() => {
		navigation.navigate("Result", { mode, score });
	}, [mode, score]);

	const onAnswer = useCallback(
		(status: AnswerStatus) => {
			if (status === AnswerStatus.Correct) {
				setScore((score) => score + 1);
			} else {
				if (mode === GameMode.InstantDeath) {
					gameOver();
				}
			}
		},
		[gameOver, mode]
	);

	const nextQuestion = useCallback(() => {
		if (isFinalQuestion && mode !== GameMode.Rush && mode !== GameMode.InstantDeath) {
			return gameOver();
		}
		else if (isFinalQuestion && (mode === GameMode.Rush || mode === GameMode.InstantDeath)) {
			//fetch more questions
			fetchQuestions({ clientToken, userToken }).then((questions) => {
				setQuestions(questions);
			});
			setQuestionIndex((questionIndex) => questionIndex = 0);
			return setInfiniteIndex((infiniteIndex) => infiniteIndex + 1);
		}
		setInfiniteIndex((index) => index + 1);
		return setQuestionIndex((index) => index + 1);
	}, [questionIndex, infiniteIndex, questions.length, gameOver, isFinalQuestion]);

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

	const renderIndex = (() =>{
		if (mode === GameMode.Rush) {
			return remainingTime;
		}
		else if (mode === GameMode.Classic) {
			return "Question: " + (infiniteIndex + 1) + "/" + questions.length;
		}
		else return "Question: " + (infiniteIndex + 1);
	});

	return (
		<View style={{ backgroundColor: black }}>
			<Text style={[styles.title, { textAlign: "center" }]}>
				{ renderIndex() }
			</Text>
			<Question
				key={questionIndex}
				index={questionIndex}
				data={currentQuestion}
				nextQuestion={nextQuestion}
				onAnswer={onAnswer}
				isFinalQuestion={isFinalQuestion}
				mode={mode}
			/>
		</View>
	);
};

export default GameScreen;
