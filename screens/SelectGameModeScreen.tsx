import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import styles from "../styles/styles";
import { GameMode } from "../components/game/enums";
import CustomButton from "../components/CustomButton";
import { FC } from "react";
import React from "react";

const SelectGameModeScreen: FC<RootStackScreenProps<"SelectGameMode">> = ({
	navigation,
	route: { params: redirectTo, params: { text } },
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Text style={styles.title}>{text}</Text>
			
				<CustomButton
					title="Best of 10"
					onPress={() =>
						navigation.navigate({
							name: redirectTo.redirectTo,
							params: { mode: GameMode.Classic },
						})
					}
				/>

				<CustomButton
					title="Time Limit"
					onPress={() =>
						navigation.navigate({
							name: redirectTo.redirectTo,
							params: { mode: GameMode.Rush },
						})
					}
				/>
				<CustomButton
					title="Instant death"
					onPress={() =>
						navigation.navigate({
							name: redirectTo.redirectTo,
							params: { mode: GameMode.InstantDeath },
						})
					}
				/>
				<CustomButton
					title="Odd one out"
					onPress={() =>
						navigation.navigate({
							name: redirectTo.redirectTo,
							params: { mode: GameMode.OddOneOut },
						})
					}
				/>
				<CustomButton
					title="Back"
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SelectGameModeScreen;
