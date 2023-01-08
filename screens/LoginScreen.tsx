import React, { useContext, useEffect } from "react";
import { RootStackScreenProps } from "../types";
import { Linking, StyleSheet } from "react-native";
import { AuthContext } from "../components/AuthContext";
import SpotifyLogin from "../components/SpotifyLogin";
import { View, Text } from "../components/Themed";

const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
	const { userToken, setUserToken } = useContext(AuthContext);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		const listener = Linking.addEventListener("url", (e) => {
			const token = e?.url
				?.split("#")[1]
				.split("&")
				.find((item) => item.startsWith("access_token="))
				?.split("=")[1];

			// if token exists, update context and navigate to root
			if (token) {
				setUserToken(token || "");
				timeout = setTimeout(() => navigation.navigate("Home"), 1500);
			}
		});
		return () => {
			clearTimeout(timeout);
			// Linking.removeSubscription(listener);
		};
	}, []);

	return (
		<View style={styles.container}>
			{userToken ? <Text>Login successful</Text> : <SpotifyLogin />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginScreen;

// var express = require('express'); // Express web server framework
// var request = require('request'); // "Request" library
// var cors = require('cors');
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

// var client_id = 'd760e0ff5af14deab0c1384a48669a74'; // Your client id
// var client_secret = 'fc3afdaaae5d43e1ad37028019958240'; // Your secret
// var redirect_uri = 'http://localhost:19006'; // Your redirect uri

// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
// var generateRandomString = function(length: number) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// var stateKey = 'spotify_auth_state';

// var app = express();

// app.use(express.static(__dirname + '/public'))
//    .use(cors())
//    .use(cookieParser());

// app.get('/login', function(req: any, res: { cookie: (arg0: string, arg1: string) => void; redirect: (arg0: string) => void; }) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   var scope = 'scope';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/callback', function(req: { query: { code: null; state: null; }; cookies: { [x: string]: any; }; }, res: { redirect: (arg0: string) => void; clearCookie: (arg0: string) => void; }) {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   var code = req.query.code || null;
//   var state = req.query.state || null;
//   var storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     request.post(authOptions, function(error: any, response: { statusCode: number; }, body: { access_token: any; refresh_token: any; }) {
//       if (!error && response.statusCode === 200) {

//         var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//         var options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, function(error: any, response: any, body: any) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

// app.get('/refresh_token', function(req: { query: { refresh_token: any; }; }, res: { send: (arg0: { access_token: any; }) => void; }) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error: any, response: { statusCode: number; }, body: { access_token: any; }) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });
