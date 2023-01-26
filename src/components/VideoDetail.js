import React from "react";
import { Container, Embed, Header } from "semantic-ui-react";
import CommentAnalysis from "./CommentAnalysis";
import Comments from "./Comments";
import "../styles/VideoDetail.css";

const VideoDetail = ({
	video,
	comments,
	loadComments,
	isLoadingComments,
	analyzeComments,
	isAnalysisOpenedn,
	analyzeWords,
	nextPageToken,
}) => {
	return (
		<div className="videodetail">
			<Embed
				source="youtube"
				id={video && JSON.stringify(video) !== "{}" ? video.id.videoId : ""}
				placeholder={
					video && JSON.stringify(video) !== "{}"
						? video.snippet.thumbnails.high.url
						: ""
				}
			/>
			<Header
				as="h3"
				content={
					video && JSON.stringify(video) !== "{}" ? video.snippet.title : ""
				}
			/>
			<Container
				textAlign="justified"
				concontent={
					video && JSON.stringify(video) !== "{}"
						? video.snippet.description
						: ""
				}
			/>
			<CommentAnalysis
				analyze={analyzeComments}
				isAnalysisOpened={isAnalysisOpenedn}
				topWords={analyzeWords}
			/>
			<Comments
				commentList={comments}
				isLoading={isLoadingComments}
				loadMoreComments={loadComments}
				token={nextPageToken}
			/>
		</div>
	);
};

export default VideoDetail;
