import React from "react";
import ReactDOM from "react-dom";
import firebase from "../Firestore";
import { firestore } from "firebase";

class Runway extends React.Component {
	constructor() {
		super();
		this.state = {
			ICAO: " ",
			GSOffsetX: " ",
			GSOffsetY: " ",
			ApproachLights: " ",
			DH: " ",
			GlideSlope: " ",
			TCH: " ",
			Width: " ",
			EdgeSpacing: " ",
			Units: true,
		};
	}

	updateInput = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	addRunway = (event) => {
		event.preventDefault();

		const db = firebase.firestore();

		/* db.settings({
            timestampsInSnapshots: true
        });*/
		firestore()
			.collection("Runways")
			.doc(String(this.state.icao))
			.set({
				ICAO: String(this.state.icao),
				GSOffsetX: Number(this.state.gsx),
				GSOffsetY: Number(this.state.gsy),
				ApproachLights: Number(this.state.approachLights),
				DH: Number(this.state.dh),
				GlideSlope: Number(this.state.glideSlope),
				TCH: Number(this.state.tch),
				Width: Number(this.state.width),
				EdgeSpacing: Number(this.state.edgeSpace),
				Units: Boolean(this.state.unit),
			});
		// After submission values are cleared
		this.setState({
			icao: " ",
			gsx: 0,
			gsy: 0,
			approachLights: 0,
			dh: 0,
			glideSlope: 0,
			tch: 0,
			width: 0,
			edgeSpace: 0,
			unit: true,
		});
	};

	render() {
		const {
			icao,
			gsx,
			gsy,
			approachLights,
			dh,
			glideSlope,
			tch,
			width,
			edgeSpace,
			unit,
		} = this.state;
		return (
			<form onSubmit={this.addRunway}>
				<input
					type='text'
					name='icao'
					placeholder='Runway ICAO Code'
					onChange={this.updateInput}
					value={icao}
				/>
				<br />
				<input
					type='number'
					name='gsx'
					placeholder="Runway's GSOffset X value"
					onChange={this.updateInput}
					value={gsx}
				/>
				<br />
				<input
					type='number'
					name='gsy'
					placeholder="Runway's GSOffset Y value"
					onChange={this.updateInput}
					value={gsy}
				/>
				<br />
				<input
					type='number'
					name='approachLights'
					placeholder="Runway's Approach Lights type"
					onChange={this.updateInput}
					value={approachLights}
				/>
				<br />
				<input
					type='number'
					name='dh'
					placeholder="Runway's Decision Height value"
					onChange={this.updateInput}
					value={dh}
				/>
				<br />
				<input
					type='number'
					name='glideSlope'
					placeholder="Runway's Glide Slope angle"
					onChange={this.updateInput}
					value={glideSlope}
				/>
				<br />
				<input
					type='number'
					name='tch'
					placeholder="Runway's TCH value"
					onChange={this.updateInput}
					value={tch}
				/>
				<br />
				<input
					type='number'
					name='width'
					placeholder='Runway width'
					onChange={this.updateInput}
					value={width}
				/>
				<br />
				<input
					type='number'
					name='edgeSpace'
					placeholder="Runway's edgelight spacing"
					onChange={this.updateInput}
					value={edgeSpace}
				/>
				<br />
				<input
					type='checkbox'
					name='unit'
					// value="Metric"
					onChange={this.updateInput}
					value={unit}
				/>{" "}
				These values are in metric.
				<br />
				<button type='submit' />
				Submit
			</form>
		);
	}
}

export default Runway;
