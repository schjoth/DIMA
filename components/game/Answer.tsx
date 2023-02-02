import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { AnswerStatus } from "./enums";

interface AnswerProps {
	answer: string;
	onPress: (answer: string) => AnswerStatus;
	// | undefined;
	disabled?: boolean;
}

const Answer: React.FC<AnswerProps> = ({
	answer,
	onPress,
	disabled = false,
}) => {
	const [style, setStyle] = useState<any>(styles.base);

	const handleAnswer = (answer: string) => {
		if (disabled) return;
		const status = onPress(answer);

		// change the style of the answer based on whether it was correct or incorrect
		if (status) {
			setStyle([styles.base, styles[status]]);
		}
	};

	// if the backgroundColor has changed then this answer was pressed
	// and therefore "disabled"-style should not be applied
	if (style.backgroundColor === "#D9D9D9" && disabled) {
		setStyle([styles.base, styles.disabled]);
	}

	return (
		<Pressable onPress={() => handleAnswer(answer)} style={style}>
			<Text numberOfLines={1}>{answer}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	base: {
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		width: "100%",
		minWidth: 100,
		maxWidth: 200,
		backgroundColor: "#D9D9D9",
	},
	CORRECT: {
		backgroundColor: "#1DB954",
	},
	INCORRECT: {
		backgroundColor: "#FF3535",
	},
	disabled: {
		// opacity: 0.5,
	},
});

export default Answer;
