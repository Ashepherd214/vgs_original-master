import React, { Component } from "react";
import { Button, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import { firestore, auth, handleWindowsLogin } from "../../Firestore";
import MsBtn from "../../img/MsBtnLight.png";
import Jumbotron from "../CustomComponents/Jumbotron";
import Form from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Authentication extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Jumbotron>
					<h1>Welcome to RSi's Visual Ground Segment Application! </h1>
				</Jumbotron>
				<h1>Login Below</h1>
				{/* <Button
					onClick={() => {
						handleWindowsLogin();
					}}
				>
					<Image src={MsBtn} alt='Microsoft Sign In Button' />
				</Button> */}
				<Tabs>
					<Tab eventKey='login' title='Login'>
						<Container>
							<LoginForm />
						</Container>
					</Tab>
					<Tab eventKey='register' title='Register'>
						<Container>
							<RegisterForm />
						</Container>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default Authentication;
