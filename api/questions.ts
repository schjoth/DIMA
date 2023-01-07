import { Questions } from "../components/game/types";
import axios from "axios";
import { authorize } from "./auth";
import { request } from 'https';
import { useEffect } from 'react';


const token = authorize();
//const accessToken = token.clientToken;
//console.log(accessToken);
const playlistId = '6boWrcZpGkek2uUtkUuDrS';


export const getTopTracks = async (token: String) => {
	const aToken = (await authorize()).clientToken;
	//const accessToken = aToken.clientToken;
	const settings = {
	headers: {'Authorization': 'Bearer ' + token}
	}
	console.log(token);
	const response = await fetch(`https://api.spotify.com/v1/me/top/artists`, settings);
	const data = await response.json()
	return data;
	}



export const getPlaylist = async (playlistId: String) => {
	const aToken = (await authorize()).clientToken;
	const settings = {
		headers: {'Authorization': 'Bearer ' + aToken}
		}

	try {
	  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, settings);
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };


const playlist = getPlaylist(playlistId).then(res => console.log(res));
console.log(playlist);

//const playlist1 = getPlaylist1(playlistId, accessToken);
//console.log(playlist1);



export const fetchQuestions = async (): Promise<Questions> => {
	//TODO: Implement logic here

	let req = Promise.resolve([
		{
			question: "Who made this song?",
			hint: "Ferrari",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Radioactive",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Telephone",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Mi fai impazzire",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Penger til grava",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
		{
			question: "Who made this song?",
			hint: "Mockingbird",
			answers: ["wrong1", "wrong2", "wrong3"],
			correctAnswer: "correct",
		},
	] as Questions);

	return req;
};
