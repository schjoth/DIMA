import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import styles from "../styles/styles";
import { GameMode } from "../components/game/enums";
import CustomButton from "../components/CustomButton";

type ProfileScreenNavigationProp =
	NativeStackNavigationProp<RootStackParamList>;

type Props = {
	navigation: ProfileScreenNavigationProp;
};
/*Husk å endre i types.tsx linje 16*/

const ModalScreen = ({ navigation }: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Text style={styles.title}>Choose your quiz!</Text>
			</View>
			<CustomButton
				title="Classic"
				onPress={() =>
					navigation.navigate({
						name: "Game",
						params: { mode: GameMode.Classic },
					})
				}
			/>

			<CustomButton
				title="Rush"
				onPress={() =>
					navigation.navigate({
						name: "Game",
						params: { mode: GameMode.Rush },
					})
				}
			/>
			<CustomButton
				title="Instant death"
				onPress={() =>
					navigation.navigate({
						name: "Game",
						params: { mode: GameMode.InstantDeath },
					})
				}
			/>
			<CustomButton
				title="30s preview"
				onPress={() =>
					navigation.navigate({
						name: "Game",
						params: { mode: GameMode.Preview },
					})
				}
			/>
			<CustomButton
				title="Odd one out"
				onPress={() =>
					navigation.navigate({
						name: "Game",
						params: { mode: GameMode.OddOneOut },
					})
				}
			/>
			<CustomButton
				title="Back"
				variant="secondary"
				onPress={() => navigation.navigate("Home")}
			/>
		</SafeAreaView>
	);
};

export default ModalScreen;
