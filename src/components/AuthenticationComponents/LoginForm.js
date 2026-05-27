import React, { useCallback, useContext, Component, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { firestore, auth, handleWindowsLogin } from "../../Firestore";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { withRouter, Navigate } from "react-router-dom";
import MsBtn from "../../img/MsBtnLight.png";
import { AuthContext } from "../../Auth.js";

const LoginForm = () => {
	const [loginEmail, setEmail] = useState("");
	const [loginPassword, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "loginEmail") {
			setEmail(value);
		} else if (name === "loginPassword") {
			setPassword(value);
		}
	};

	const handleLoginSubmit = (event, loginEmail, loginPassword) => {
		event.preventDefault();
		console.log("Login email is: " + loginEmail);
		console.log("Login password is: " + loginPassword);
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(() => {
				auth
					.signInWithEmailAndPassword(loginEmail, loginPassword)
					.catch((error) => {
						setError("Error signing in with password and email.");
						console.error("Error signing in with password and email.", error);
						
					});
					return <Navigate to='/Dashboard' />;
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
	};

	return (
		<Container>
			<Form>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						type='email'
						placeholder='Enter Email Name'
						name='loginEmail'
						id='loginEmail'
						value={loginEmail}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type='password'
						placeholder='Enter Password Name'
						name='loginPassword'
						id='loginPassword'
						value={loginPassword}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					onClick={(event) => {
						handleLoginSubmit(event, loginEmail, loginPassword);
					}}
				>
					Submit
				</Button>
				{/* <Button
					onClick={() => {
						handleWindowsLogin();
					}}
				>
					<Image src={MsBtn} alt='Microsoft Sign In Button' />
				</Button> */}
			</Form>
		</Container>
	);
};

export default LoginForm;
