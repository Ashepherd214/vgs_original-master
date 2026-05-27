import React, { useCallback, useContext, Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import firebase from "../../Firestore";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../../Auth.js";

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: "",
			Password: "",
		};
	}

	Logoff = (event) => {
        firebase.auth().signOut().then(() => {
			<h3>You have successfully been logged out</h3>
        }).catch((error) => {
			console.log("Error logging out: " + error)
        })
	};



	render() {
		return (
			<Container>
				<h3>You have been logged off</h3>
			</Container>
		);
	}
}

export default LoginForm;
