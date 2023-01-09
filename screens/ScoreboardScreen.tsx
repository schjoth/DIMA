import { StyleSheet, Button, SafeAreaView } from "react-native";
import * as React from "react";
import { Text, View } from "../components/Themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import styles from "../styles/styles";
import Scoreboard from "../components/Scoreboard";
import CustomButton from "../components/CustomButton";

type ProfileScreenNavigationProp =
	NativeStackNavigationProp<RootStackParamList>;

type Props = {
	navigation: ProfileScreenNavigationProp;
};
/*Husk å endre i types.tsx linje 16*/

const ScoreboardScreen = ({ navigation }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Scoreboard highscores={[10, 8, 7, 6, 5]} highlightIndex={2} />

				<CustomButton
					title="Back"
					variant="secondary"
					onPress={() => navigation.navigate("Home")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ScoreboardScreen;
