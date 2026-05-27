import React, { Component } from "react";
import ManageAircrafts from "./VGS Objects/ManageAircrafts";
import ManageRunways from "./VGS Objects/ManageRunways";
import CalculateButton from "./components/CalculateButton";
import { Container } from "react-bootstrap";
import firebaseapp from "firebase/compat/app";
import { Link } from "react-router-dom";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			me: null, // firebaseapp.auth().currentUser,
		};
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
		console.log(String(runwayData));
		this.setState({
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
		});
		// console.log("The Runway data from child is: " + runwayData)
		// console.log("Runway Lights data from child is: " + runwayLights)
		// console.log("The Runway data from parent is: " + this.state.data_from_runway)
		// console.log("The Runway Lights data from parent is: " + this.state.lights_data_from_runway)
		// console.log("The Runway data from parent is: " + this.state.runway_name)
		// console.log("The Runway data from parent is: " + this.state.runway_icao)
		// console.log("The Runway data from parent is: " + this.state.runway_decision_height)
		// console.log("The Runway data from parent is: " + this.state.runway_edge_light_spacing)
		// console.log("The Runway data from parent is: " + this.state.runway_gs_x)
		// console.log("The Runway data from parent is: " + this.state.runway_gs_y)
		// console.log("The Runway data from parent is: " + this.state.runway_glideslope)
		// console.log("The Runway data from parent is: " + this.state.runway_tch)
		// console.log("The Runway data from parent is: " + this.state.runway_width)
		// console.log("The Runway data from parent is: " + this.state.runway_unit_choice)
		//this.setState({value_key:value_key})
		//this.forceUpdate()
		// this.setState({
		//   rerender: !this.state.rerender
		// });
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
		this.setState({
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
		});
		console.log("The Aircraft data from child is: " + aircraftData);
		console.log(
			"The Aircraft data from parent is: " + this.state.data_from_aircraft
		);
		//this.setState({value_key:value_key})
		//this.forceUpdate()
		// this.setState({
		//   rerender: !this.state.rerender
		// });
	};

	render() {
		return (
			<Container>
				<ManageAircrafts parentFunction={this.parentAircraftCallbackFunction} />
				<ManageRunways parentFunction={this.parentRunwayCallbackFunction} />
				<Link to='/VGS'>
					<CalculateButton />
				</Link>
			</Container>
		);
	}
}

export default Dashboard;
