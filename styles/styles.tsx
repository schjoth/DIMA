import { StyleSheet } from "react-native";

export const green = "#1DB954",
	black = "#000",
	offWhite = "#D9D9D9";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "space-around",
		backgroundColor: black,
		paddingBottom: 70,
		paddingTop: 70,
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
		fontSize: 35,
		fontWeight: "bold",
		textAlign: "center",
		color: green,
	},
	index:{
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: green,
	},
	// separator: {
	// 	marginVertical: 30,
	// 	height: 1,
	// 	width: "80%",
	// 	color: green,
	// },
	header: {
		fontSize: 20,
	},
	subNavItem: {
		padding: 5,
	},
});

export default styles;
