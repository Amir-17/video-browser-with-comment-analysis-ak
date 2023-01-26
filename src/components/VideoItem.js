import React from "react";
import { Item } from "semantic-ui-react";
import "../styles/VideoItem.css";

const VideoItem = ({ videoData, action, resetCommToken }) => {
	return (
		<Item
			onClick={() => {
				action(videoData);
				resetCommToken("");
			}}
			className="videoitem">
			<Item.Image size="tiny" src={videoData.snippet.thumbnails.default.url} />
			<Item.Content>
				<Item.Header as="h4">{videoData.snippet.title}</Item.Header>
			</Item.Content>
		</Item>
	);
};

export default VideoItem;
