import React from "react";
import VideoItem from "./VideoItem";
import { Item } from "semantic-ui-react";
import "../styles/VideoList.css";

const VideoList = ({ videoList, selectVideo, resetCommentsToken }) => {
	return (
		<Item.Group divided className="videolist">
			<Item.Header as="h3">Search results: </Item.Header>
			{videoList && videoList.length > 0
				? videoList.map((item, index) => {
						return (
							<VideoItem
								key={`videoItem_${index}`}
								action={selectVideo}
								videoData={item}
								resetCommToken={resetCommentsToken}
							/>
						);
				  })
				: null}
		</Item.Group>
	);
};

export default VideoList;
