export enum AnswerStatus {
	Correct = "CORRECT",
	Incorrect = "INCORRECT",
}

//support for multiple game modes
export enum GameMode {
	Classic = "BEST OF 10",
	Rush = "TIME LIMIT",
	InstantDeath = "INSTANT DEATH",
	Preview = "30S PREVIEW",
	OddOneOut = "ODD ONE OUT",
}

export enum QuestionTypes {
	WhoMadeThisSong = "Who made this song?",
	WhoMadeThisAlbum = "Who made this album?",
	WhichSongNotWrittenByArtist = "Which song was not made by this artist?",
	WhichSongIsNotInThisAlbum = "Which song is not in this album?",
}
