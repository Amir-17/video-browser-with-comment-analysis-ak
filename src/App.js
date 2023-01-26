import { useState, useEffect } from "react";
import { videos } from "./api";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import "./App.css";

function App() {
	const defaultSearchTherm = "mkbhd";
	const [searchTerm, setSearchTerm] = useState("");
	const [videoList, setVideoList] = useState([]);
	const [videoComments, setVideoComments] = useState([]);
	const [commentsNextPageToken, setCommentNextPageToken] = useState("");
	const [selectedVideo, setSelecetedVideo] = useState({});
	const [topWordOccurences, setTopWordOccurences] = useState([]);

	const [isLoadingComments, setIsLoadingComments] = useState(false);
	const [isCommentAnalysisOpened, setIsCommentAnalysisOpened] = useState(false);

	const analyzeComments = () => {
		setIsCommentAnalysisOpened(true);
		let textArray = [];
		let wordsArray = [];
		let count = {};
		let top15 = [];

		const regex = new RegExp("^[a-z]+$");
		if (videoComments && videoComments.length > 0) {
			videoComments.forEach((comment) => {
				textArray.push(comment.snippet.topLevelComment.snippet.textDisplay);
			});

			textArray.forEach((element) => {
				let stringArray = element.split(/[, ]+/);

				stringArray.forEach((string) => {
					if (regex.test(string)) {
						wordsArray.push(string);
					}
				});
			});

			wordsArray.forEach((word) => {
				if (count[word]) {
					count[word] += 1;
				} else {
					count[word] = 1;
				}
			});

			const sorted = Object.entries(count).sort(([, a], [, b]) => b - a);

			for (let i = 0; i < 15; i++) {
				top15.push(sorted[i]);
			}
		}

		setTopWordOccurences(top15);
	};

	const fetchVideoList = () => {
		setIsCommentAnalysisOpened(false);
		setVideoComments([]);
		setCommentNextPageToken("");
		console.log(`${new Date()} - Entering fetchVideoList()`);

		videos
			.search(searchTerm.length > 0 ? searchTerm : defaultSearchTherm)
			.then((response) => {
				setVideoList(response.data.items);
				console.log("fetchVideoList() method executed");
			})
			.catch((error) => console.log(error.code, " - ", error.message));

		console.log(`${new Date()} - Exiting fetchVideoList()`);
	};

	const fetchComments = () => {
		console.log(`${new Date()} - Entering fetchComments()`);
		if (selectedVideo && JSON.stringify(selectedVideo) !== "{}") {
			setIsLoadingComments(true);
			if (
				(!commentsNextPageToken || commentsNextPageToken.length === 0) &&
				videoList.length <= 100
			) {
				videos
					.getCommentsByVideoId(selectedVideo.id.videoId)
					.then((response) => {
						console.log("Fetched firs comments!");
						setVideoComments(response.data.items);
						setCommentNextPageToken(response.data.nextPageToken);
						setIsLoadingComments(false);
					})
					.catch((error) => console.log(error.message));
			} else {
				videos
					.getNextPageOfComments(
						selectedVideo.id.videoId,
						commentsNextPageToken
					)
					.then((response) => {
						console.log("Fetched new page of comments");
						setVideoComments([...videoComments, ...response.data.items]);
						setCommentNextPageToken(response.data.nextPageToken);
						setIsLoadingComments(false);
					})
					.catch((error) => console.log(error.message));
			}
		}
		console.log(`${new Date()} - Exiting fetchComments()`);
	};

	useEffect(() => {
		console.log("Executed useEffect to fetch video list!");
		fetchVideoList();
	}, []);

	useEffect(() => {
		console.log(
			"Executed useEffect to set selected video and fetch comments base on video List property change!"
		);
		setSelecetedVideo(videoList.length > 0 ? videoList[0] : {});
	}, [videoList]);

	useEffect(() => {
		console.log(
			"Executed useEffect to fetch comments based on selectedVideo property change!"
		);
		fetchComments();
	}, [selectedVideo]);

	console.log("currently slected video", selectedVideo);

	return (
		<div className="app">
			<SearchBar search={fetchVideoList} inputAction={setSearchTerm} />
			<div className="video-container">
				<VideoDetail
					isLoadingComments={isLoadingComments}
					video={selectedVideo}
					comments={videoComments}
					loadComments={fetchComments}
					analyzeComments={analyzeComments}
					isAnalysisOpenedn={isCommentAnalysisOpened}
					analyzeWords={topWordOccurences}
					nextPageToken={commentsNextPageToken}
				/>
				<VideoList
					videoList={videoList}
					selectVideo={setSelecetedVideo}
					resetCommentsToken={setCommentNextPageToken}
				/>
			</div>
		</div>
	);
}

export default App;
