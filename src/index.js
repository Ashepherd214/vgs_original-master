import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "tachyons";
import ManageAircrafts from "./VGS Objects/ManageAircrafts";
import ManageRunways from "./VGS Objects/ManageRunways";
import CalculateButton from "./components/CalculateButton";
import ManageVGS from "./Calculation Components/ManageVGS";
import "./index.css";
import NavigationBar from "./components/NavigationBar";
import Authentication from "./components/AuthenticationComponents/AuthenticationPage";
//import firebaseapp from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import "firebase/compat/auth";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard.js";
import history from "history";
import VGSErrorBoundary from "./VGSErrorBoundary";
import UserProvider from "./Auth";
//import firebase from "firebase/compat/app";
//import auth from "./Firestore";

// const auth = getAuth();
/**
 * Need
 */
export class App extends Component {
	state = {
		data_from_runway: [],
		data_from_aircraft: [],
		lights_data_from_runway: "",
		runway_name: "",
		runway_icao: "",
		runway_decision_height: "",
		runway_edge_light_spacing: "",
		runway_gs_x: "",
		runway_gs_y: "",
		runway_glideslope: "",
		runway_tch: "",
		runway_width: "",
		runway_unit_choice: "",
		aircraft_xa: "",
		aircraft_xe: "",
		aircraft_za: "",
		aircraft_ze: "",
		aircraft_cg: "",
		aircraft_flaps: "",
		aircraft_lookdown: "",
		aircraft_pitch: "",
		aircraft_speed: "",
		aircraft_weight: "",
		aircraft_units: "",
		aircraft_type: "",
		me: null, // auth.currentUser,
	};
	constructor(props) {
		super(props);
		// this.state = {

		// };
	}

	componentDidMount = () => {
		// onAuthStateChanged(auth, (me) => {
		// 	if (me) {
		// 		this.setState({ me });
		// 	}
		// });
	};

	//componentWillUpdate(props, state)
	componentDidUpdate(props, state) {
		return state.me;
	}

	parentRunwayCallbackFunction = (
		runwayData,
		runwayLights,
		runwayName,
		runwayIcao,
		runwayDh,
		runwayEdgeSpacing,
		runwayGsx,
		runwayGsy,
		runwayGlideSlope,
		runwayTch,
		runwayWidth,
		runwayUnits
	) => {
		this.setState(
			{
				data_from_runway: runwayData,
				lights_data_from_runway: runwayLights,
				runway_name: runwayName,
				runway_icao: runwayIcao,
				runway_decision_height: runwayDh,
				runway_edge_light_spacing: runwayEdgeSpacing,
				runway_gs_x: runwayGsx,
				runway_gs_y: runwayGsy,
				runway_glideslope: runwayGlideSlope,
				runway_tch: runwayTch,
				runway_width: runwayWidth,
				runway_unit_choice: runwayUnits,
			},
			() => {
				console.log(this.state.data_from_runway);
				console.log(this.state.runway_name);
				console.log(this.state.runway_icao);
			}
		);
	};

	parentAircraftCallbackFunction = (
		aircraftData,
		aircraftXa,
		aircraftXe,
		aircraftZa,
		aircraftZe,
		aircraftCg,
		aircraftFlaps,
		aircraftLookdown,
		aircraftPitch,
		aircraftSpeed,
		aircraftWeight,
		aircraftUnits,
		aircraftType
	) => {
		console.log(aircraftData);
		this.setState(
			{
				data_from_aircraft: aircraftData,
				aircraft_xa: aircraftXa,
				aircraft_xe: aircraftXe,
				aircraft_za: aircraftZa,
				aircraft_ze: aircraftZe,
				aircraft_cg: aircraftCg,
				aircraft_flaps: aircraftFlaps,
				aircraft_lookdown: aircraftLookdown,
				aircraft_pitch: aircraftPitch,
				aircraft_speed: aircraftSpeed,
				aircraft_weight: aircraftWeight,
				aircraft_units: aircraftUnits,
				aircraft_type: aircraftType,
			},
			() => {
				console.log("The Aircraft data from child is: " + aircraftData);
				console.log(
					"The Aircraft data from parent is: " + this.state.data_from_aircraft
				);
			}
		);
	};

	// handleSignIn = history => (email, password) => {
	// 	return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
	// 	  return history.push("/Dashboard");
	// 	});
	//   };

	render() {
		return (
			<Router>
				<Routes>
					<Route
						path='/Login'
						element={<Navigate to='/Dashboard' />}
					/>
					<Route
						path='/Dashboard'
						element={
								<Container>
									<NavigationBar />
									<ManageAircrafts
										parentFunction={this.parentAircraftCallbackFunction}
									/>
									<ManageRunways
										parentRunFunction={this.parentRunwayCallbackFunction}
									/>
									<Link to='/VGS'>
										<CalculateButton />
									</Link>
								</Container>
						}
					/>
					<Route
						path='/VGS'
						element={
							<Container>
								<NavigationBar />
								{/* For some reason these values are being passed on as empty and null */}
								<ManageVGS
									runwayLights={this.state.lights_data_from_runway}
									runwayName={this.state.data_from_runway}
									aircraftName={this.state.data_from_aircraft}
									runwayIcao={this.state.runway_icao}
									runwayDh={this.state.runway_decision_height}
									runwayEdgeSpacing={this.state.runway_edge_light_spacing}
									runwayGsx={this.state.runway_gs_x}
									runwayGsy={this.state.runway_gs_y}
									runwayGlideSlope={this.state.runway_glideslope}
									runwayTch={this.state.runway_tch}
									runwayWidth={this.state.runway_width}
									runwayUnits={this.state.runway_unit_choice}
									aircraftXa={this.state.aircraft_xa}
									aircraftXe={this.state.aircraft_xe}
									aircraftZa={this.state.aircraft_za}
									aircraftZe={this.state.aircraft_ze}
									aircraftCg={this.state.aircraft_cg}
									aircraftFlaps={this.state.aircraft_flaps}
									aircraftLookdown={this.state.aircraft_lookdown}
									aircraftPitch={this.state.aircraft_pitch}
									aircraftSpeed={this.state.aircraft_speed}
									aircraftWeight={this.state.aircraft_weight}
									aircraftUnits={this.state.aircraft_units}
									aircraftType={this.state.aircraft_type}
								/>
							</Container>
						}
					/>

					<Route path='/Logoff' element={<Navigate to='/Dashboard' />}></Route>
					<Route path='/' element={<Navigate to='/Dashboard' />}></Route>
				</Routes>
			</Router>
		);
	}
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<UserProvider>
		<App />
	</UserProvider>
);
