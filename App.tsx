import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ModalScreen from "./screens/ModalScreen";
import Scoreboard from "./screens/Scoreboard";
import Settings from "./screens/Settings";

type RootStackParamList = {
	Home: undefined; // undefined because you aren't passing any params to the home screen
	Modal: undefined; //Issue Is here i Think
	Scoreboard: undefined;
	Settings: undefined;
	Profile: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Modal" component={ModalScreen} />
				<Stack.Screen name="Scoreboard" component={Scoreboard} />
				<Stack.Screen name="Settings" component={Settings} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
