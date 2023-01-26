import React from "react";
import { Divider, Form, Header } from "semantic-ui-react";
import "../styles/SearchBar.css";

const SearchBar = ({ search, inputAction }) => {
	const handleInput = (e) => {
		e.preventDefault();

		inputAction(e.target.value);
	};

	return (
		<div className="searchbar-body">
			<Header
				content="Youtube Video Search"
				className="searchbar-header"
				color="red"
			/>
			<Form
				onSubmit={() => {
					search();
				}}
				className="searchbar-form">
				<Form.Field>
					<Form.Input
						onChange={(e) => handleInput(e)}
						icon="search"
						placeholder="Type something..."
					/>
				</Form.Field>
			</Form>
			<Divider />
		</div>
	);
};

export default SearchBar;
