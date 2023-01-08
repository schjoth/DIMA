import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ModalScreen from "./screens/ModalScreen";
import Scoreboard from "./screens/Scoreboard";
import Settings from "./screens/Settings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./components/AuthContext";
import GameScreen from "./screens/GameScreen";
import { RootStackParamList } from "./types";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Modal" component={ModalScreen} />
						<Stack.Screen name="Game" component={GameScreen} />
						<Stack.Screen
							name="Scoreboard"
							component={Scoreboard}
						/>
						<Stack.Screen name="Settings" component={Settings} />
					</Stack.Navigator>
				</NavigationContainer>
			</AuthProvider>
		</SafeAreaProvider>
	);
}

export default App;
