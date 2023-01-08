/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GameMode } from "./components/game/enums";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	Modal: undefined;
	Game: { mode: GameMode };
	Scoreboard: undefined;
	Settings: undefined;
	NotFound: undefined;
	Result: { score: number; mode: GameMode };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;
