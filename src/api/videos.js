import axios from "axios";
import config from "../config";

const apiKey = config.API_KEY;
const baseUrl = config.BASE_URL;

const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export default {
	search: (queryString) =>
		axios.get(
			`${baseUrl}/search?key=${apiKey}&type=video&part=snippet&maxResults=5&q=${queryString}`,
			headers
		),
	getCommentsByVideoId: (videoId) =>
		axios.get(
			`${baseUrl}/commentThreads?key=${apiKey}&maxResults=100&part=snippet&videoId=${videoId}`,
			headers
		),
	getNextPageOfComments: (videoId, nextPageToken) =>
		axios.get(
			`${baseUrl}/commentThreads?key=${apiKey}&maxResults=100&pageToken=${nextPageToken}&part=snippet&videoId=${videoId}`
		),
};
