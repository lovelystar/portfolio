import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let Loading = ({ isLoading }) => (
	isLoading ? 
		<div className="loading">
			<FontAwesomeIcon icon="spinner" size="5x" spin />
		</div>
	: null
);

const mapStateToProps = (state) => {

	return ({
		isLoading: state.BoardReducer.isLoading,
	});
	
};

Loading = connect(mapStateToProps, null)(Loading);
export default Loading;