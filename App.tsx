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

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
						<Stack.Screen 
							name="Home" 
							component={HomeScreen} 
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
						<Stack.Screen 
							name="Game" 
							component={GameScreen} 
							options={{
								headerBackVisible: false,
								headerShown: false,
								/* headerTintColor: "white",
								headerStyle: {
									backgroundColor: "#000000",
								}, */
							}}
						/>
						<Stack.Screen
							name="Scoreboard"
							component={Scoreboard}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="SelectGameMode"
							component={SelectGameModeScreen}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
						<Stack.Screen 
							name="Result" 
							component={ResultScreen}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}} 
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</AuthProvider>
		</SafeAreaProvider>
	);
}

export default App;
