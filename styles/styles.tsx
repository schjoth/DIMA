import { StyleSheet } from "react-native";

export const green = "#1DB954",
	black = "#000",
	offWhite = "#D9D9D9";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: black,
	},
	board: {
		alignItems: "center",
		height: "70%",
		width: "90%",
		justifyContent: "center",
		backgroundColor: offWhite,
		borderRadius: 25,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: green,
	},
	navigation: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: 300,
		backgroundColor: black,
		width: "100%",
	},
	header: {
		fontSize: 20,
	},
	subNavItem: {
		padding: 5,
	},
});

export default styles;
