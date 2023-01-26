import React from "react";
import {
	Comment,
	Header,
	Icon,
	Loader,
	Segment,
	Dimmer,
	Image,
} from "semantic-ui-react";
import "../styles/Comments.css";

function Comments({ commentList, loadMoreComments, token }) {
	const onScroll = () => {
		const scroll_top =
			commentList && commentList.length > 0
				? document.getElementById("commentGroup").scrollTop
				: 0;
		const scroll_height =
			commentList && commentList.length > 0
				? document.getElementById("commentGroup").scrollHeight
				: 0;

		const total = scroll_height - scroll_top;

		if (total >= 680 && total <= 701 && token) {
			loadMoreComments();
		}
	};

	return (
		<>
			<Header content="Comments" as="h3" dividing />
			<Comment.Group
				id="commentGroup"
				onScroll={() => onScroll()}
				className="comments-container">
				{commentList && commentList.length > 0 ? (
					commentList.map((comment) => {
						const comm = comment.snippet.topLevelComment.snippet;
						return (
							<Comment key={`comment_${comment.id}`}>
								<Comment.Avatar src={comm.authorProfileImageUrl} />
								<Comment.Content>
									<Comment.Author as="span">
										{comm.authorDisplayName}
									</Comment.Author>
									<Comment.Metadata>
										<div>{comm.publishedAt}</div>
									</Comment.Metadata>
									<Comment.Text>{comm.textDisplay}</Comment.Text>
									<div>
										{comm.likeCount} <Icon name="thumbs up" />
									</div>
								</Comment.Content>
							</Comment>
						);
					})
				) : (
					<Segment>
						<Dimmer active inverted>
							<Loader size="large">Loading</Loader>
						</Dimmer>
						<Image src="/images/wireframe/paragraph.png" />
					</Segment>
				)}
			</Comment.Group>
		</>
	);
}

export default Comments;
