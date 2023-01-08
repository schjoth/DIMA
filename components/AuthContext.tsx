import {
	createContext,
	FC,
	ReactInstance,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { authorize } from "../api/auth";

export type AuthState = {
	clientToken: string;
	userToken: string;
	setUserToken: (token: string) => void;
};

const defaultState: AuthState = {
	clientToken: "",
	userToken: "",
	setUserToken: () => {},
};

export const AuthContext = createContext<AuthState>(defaultState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [clientToken, setclientToken] = useState<string>("");
	const [userToken, setUserToken] = useState<string>("");

	useEffect(() => {
		authorize().then((clientToken) => {
			setclientToken(clientToken);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ clientToken, userToken, setUserToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
