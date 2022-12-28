import React, { FC, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";
import Answer from "./Answer";
import { AnswerStatus } from "./enums";
import { QuestionData } from "./types";

interface QuestionProps {
	data: QuestionData;
	nextQuestion: (result: AnswerStatus) => void;
	isFinalQuestion?: boolean;
	index: number;
}

const Question: FC<QuestionProps> = ({
	data,
	nextQuestion,
	isFinalQuestion = false,
	index,
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

		setResult(status);
		return status;
	};

	const [result, setResult] = useState<AnswerStatus>();
	const handleNextQuestion = useMemo(
		() => () => result ? nextQuestion(result) : undefined,
		[result, nextQuestion]
	);

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={styles.question}>{question}</Text>
				<Text style={styles.hint}>
					#{index}
					{hint}
				</Text>
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
				title={isFinalQuestion ? "Finish" : "Next question"}
				onPress={handleNextQuestion}
				disabled={!result}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000",
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		padding: 50,
	},
	questionContainer: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	question: {
		color: "#0f0",
	},
	hint: {
		paddingTop: 20,
		color: "#fff",
	},
	answers: {
		width: "100%",
		display: "flex",
		height: 200,
		justifyContent: "space-between",
	},
});

export default Question;
