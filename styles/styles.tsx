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
	rank: {
		color: green,
		borderRadius: 25,
		width: 125,
		height: 25,
	},
	rankContainer: {
		color: offWhite,
		alignItems: "center",
		justifyContent: "center",
		width: 150,
		height: 200,
		left: 1,
		top: 1,
		borderRadius: 25,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
		color: green,
	},
	header: {
		fontSize: 20,
	},
	subNavItem: {
		padding: 5,
	},
});

export default styles;
