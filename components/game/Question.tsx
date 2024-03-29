import React, { FC, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { black, green } from "../../styles/styles";
import CustomButton from "../CustomButton";
import Answer from "./Answer";
import { AnswerStatus, GameMode } from "./enums";
import { QuestionData } from "./types";

interface QuestionProps {
	data: QuestionData;
	nextQuestion: () => void;
	onAnswer: (answer: AnswerStatus) => void;
	isFinalQuestion?: boolean;
	index: number;
	mode: GameMode;
}

const Question: FC<QuestionProps> = ({
	data,
	nextQuestion,
	onAnswer,
	isFinalQuestion = false,
	index,
	mode,
}) => {
	const { question, hint, answers, correctAnswer } = data;

	const randomizedAnswers = useMemo(
		() => [...answers, correctAnswer].sort(() => Math.random() - 0.5),
		[answers, correctAnswer]
	);

	const handleAnswer = (answer: string) => {
		const status =
			answer === correctAnswer
				? AnswerStatus.Correct
				: AnswerStatus.Incorrect;

		onAnswer(status);
		setResult(status);
		return status;
	};

	const [result, setResult] = useState<AnswerStatus>();

	const navigationText = useMemo(() =>{
		if ([GameMode.Classic, GameMode.OddOneOut].includes(mode)) {
			return isFinalQuestion ? "Finish" : "Next question";
		}
		else return "Next question"
	}, [mode, isFinalQuestion]);

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={[styles.question, { paddingStart: 40, paddingEnd: 40 }]}>{question}</Text>
				<Text style={styles.hint}>{hint}</Text>
			</View>

			<View style={styles.answers}>
				{randomizedAnswers.map((answer) => (
					<Answer
						key={answer}
						answer={answer}
						onPress={handleAnswer}
						disabled={!!result}
					/>
				))}
			</View>

			<CustomButton
				title={ navigationText }
				onPress={nextQuestion}
				disabled={!result}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: black,
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		paddingTop: 50,
		//paddingBottom: 130,
	},
	questionContainer: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	question: {
		fontSize: 25,
		textAlign: "center",
		color: green,
	},
	hint: {
		fontSize: 20,
		//paddingTop: 20,
		padding: 20,
		color: "#fff",
		textAlign: "center",
	},
	answers: {
		width: "100%",
		display: "flex",
		height: 200,
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default Question;
