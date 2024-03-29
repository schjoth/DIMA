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
import { SafeAreaView, View } from "react-native";
import styles, { black } from "../styles/styles";
import CustomButton from "../components/CustomButton";

const GameScreen: React.FC<RootStackScreenProps<"Game">> = ({
	navigation,
	route: {
		params: { mode },
	},
}) => {
	const [questions, setQuestions] = useState<Questions>([]);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	// const [infiniteIndex, setInfiniteIndex] = useState<number>(0);

	const currentQuestion: QuestionData | undefined = useMemo(
		() => questions[questionIndex],
		[questions, questionIndex]
	);

	const [score, setScore] = useState<number>(0);
	//only used for Rush mode
	const [remainingTime, setRemainingTime] = useState<number>(60);

	const { clientToken, userToken } = useContext(AuthContext);
	useEffect(() => {
		fetchQuestions({ clientToken, userToken, mode }).then((questions) => {
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

	useEffect(() => {
		if (
			questions.length - 2 === questionIndex &&
			[GameMode.Rush, GameMode.InstantDeath].includes(mode)
		) {
			fetchQuestions({ clientToken, userToken, mode }).then(
				(questions) => {
					setQuestions((prevQuestions) => [
						...prevQuestions,
						...questions,
					]);
				}
			);
		}
	}, [questionIndex, questions.length, clientToken, userToken, mode]);

	const nextQuestion = useCallback(() => {
		if (
			isFinalQuestion &&
			(mode === GameMode.Classic || mode === GameMode.OddOneOut)
		) {
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
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>Loading...</Text>
				</View>
			</SafeAreaView>
		);
	}

	const renderIndex = () => {
		if (mode === GameMode.Rush) {
			return remainingTime;
		} else if (mode === GameMode.Classic || mode === GameMode.OddOneOut) {
			return "Question: " + (questionIndex + 1) + "/" + questions.length;
		} else return "Question: " + (questionIndex + 1);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					backgroundColor: black,
					paddingBottom: 100,
				}}
			>
				<Text style={[styles.index, { textAlign: "center" }]}>
					{renderIndex()}
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
				<CustomButton
					title="End Game"
					variant="secondary"
					onPress={() =>
						navigation.navigate({
							name: "SelectGameMode",
							params: {
								redirectTo: "Game",
								text: "Choose your quiz!",
							},
						})
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default GameScreen;
