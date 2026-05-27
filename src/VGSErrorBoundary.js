import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default class VGSErrorBoundary extends Component {
	state = {
		error: "",
		errorInfo: "",
		hasError: false,
	};
	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}
	componentDidCatch(error, errorInfo) {
		console.log({ error, errorInfo });
		this.setState({ errorInfo });
	}
	render() {
		const { hasError, errorInfo } = this.state;
		if (hasError) {
			return <Navigate to='/Dashboard' />;
		} else {
			return this.props.children;
		}
	}
}
VGSErrorBoundary.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
