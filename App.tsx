import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Scoreboard from "./screens/ScoreboardScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./components/AuthContext";
import GameScreen from "./screens/GameScreen";
import { RootStackParamList } from "./types";
import LoginScreen from "./screens/LoginScreen";
import ResultScreen from "./screens/ResultScreen";
import SelectGameModeScreen from "./screens/SelectGameModeScreen";
/* import { NativeModules } from 'react-native';
const SharedStorage = NativeModules.SharedStorage; */

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen // why not first on the stack?
							name="Login"
							component={LoginScreen}
							options={{
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen name="Game" component={GameScreen} />
						<Stack.Screen
							name="Scoreboard"
							component={Scoreboard}
						/>
						<Stack.Screen
							name="SelectGameMode"
							component={SelectGameModeScreen}
						/>
						<Stack.Screen name="Result" component={ResultScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</AuthProvider>
		</SafeAreaProvider>
	);
}

export default App;
//export { SharedStorage };
