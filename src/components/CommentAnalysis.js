import React from "react";
import { Button, Header, List } from "semantic-ui-react";
import "../styles/CommentAnalysis.css";

function CommentAnalysis({ isAnalysisOpened, analyze, topWords }) {
	return (
		<div className="commentanalysis">
			{isAnalysisOpened ? (
				<List divided relaxed>
					<Header as="h3" content="Most common words in the comment section!" />
					{topWords && topWords.length > 0 ? (
						topWords.map((word) => {
							return (
								<List.Item>
									<List.Content>{`word "${word[0]}" - ${word[1]} times`}</List.Content>
								</List.Item>
							);
						})
					) : (
						<List.Item>
							<List.Content>No comments for this video</List.Content>
						</List.Item>
					)}
				</List>
			) : (
				<Button content="Analyze Comments" onClick={() => analyze()} negative />
			)}
		</div>
	);
}

export default CommentAnalysis;
