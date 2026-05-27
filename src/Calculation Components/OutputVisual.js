import React from "react";
import firestore from "../Firestore";
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	doc,
} from "firebase/firestore";
import { Stage, Layer, Rect } from "react-konva";
import { ThresholdLights } from "../components/Threshold Lights Draw";
import { LightType } from "../components/LightType";
import { ThresholdBars } from "../components/ThresholdBars";
import outputImg from "../img/Outputs Variable chart.png";
import GroundSegmentRender from "../VGSMath/GroundSegmentRender";
import { RunwayMarkingsDraw } from "../components/RunwayMarkingsDraw";
import { Navigate } from "react-router-dom";
//import { getDoc } from "@firebase/firestore";

// Draws Runway
function Runway(props) {
	return (
		<Rect
			x={0}
			y={120}
			width={props.runLength}
			height={props.runWidth}
			fill='gray'
			shadowBlur={3}
		/>
	);
}

class OutputVisuals extends React.Component {
	//_isMounted = false

	constructor(props) {
		super(props);

		this.state = {
			color: "beige",
			stageWidth: 1600,
			stageHeight: 500,
			runLength: 550,
			runWidth: 200,
			//Runway state variables
			icao: " ",
			approachlights: this.props.runwayLights,
			dh: " ",
			edgespacing: this.props.runwayEdgeSpacing,
			gsx: " ",
			gsy: " ",
			glideslope: " ",
			tch: " ",
			width: this.props.runwayWidth,
			runUnits: true,
			//Aircraft state variables
			airName: " ",
			ze: " ",
			xe: " ",
			lookdown: " ",
			za: " ",
			xa: " ",
			flaps: " ",
			speed: " ",
			weight: " ",
			cg: " ",
			pitch: " ",
			airUnits: false,
			_isMounted: false,
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		//this.getRunwayData = this.getRunwayData.bind(this);
		//this.getRunwayData(this.props.runwayName)
	}

	componentDidMount() {
		this.state._isMounted = true;

		// if (this.state._isMounted) {
		// 	this.getRunwayData(this.props.runwayName);
		// 	this.getAircraftData(this.props.aircraftName);
		// 	console.log("component has mounted");
		// } else {
		// 	console.log("components did not mount");
		// }
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	/*---------------------------Begin getRunwayData---------------------------------------- */

	/*--------------------------New get Data function using Snapshot------------------------ */
	// async getRunwayData(runwayName) {
	// 	// try {
	// 	const runName = String(runwayName);
	// 	const runDoc = doc(firestore, "Runways", runName);
	// 	console.log("runDoc is: ", runDoc);
	// 	const runDb = await getDoc(runDoc);

	// 	// const runDb = await firestore
	// 	// 	.collection("Runways")
	// 	// 	.doc(String(runwayName))
	// 	// 	.get();

	// 	this.setState({
	// 		icao: runDb.data().ICAO,
	// 		approachlights: String(runDb.data().ApproachLights),
	// 		dh: runDb.data().DH,
	// 		edgespacing: runDb.data().EdgeSpacing,
	// 		gsx: runDb.data().GSOffsetX,
	// 		gsy: runDb.data().GSOffsetY,
	// 		glideslope: runDb.data().GlideSlope,
	// 		tch: runDb.data().TCH,
	// 		width: runDb.data().Width,
	// 		runUnits: String(runDb.data().Units),
	// 	});
	// 	// }
	// 	// catch (error) {
	// 	// 	console.log("Unable to retrieve the doc", error);
	// 	// }
	// }

	// async getAircraftData(aircraftName) {
	// 	// try {

	// 	const airName = String(aircraftName);
	// 	const airDoc = doc(firestore, "Aircrafts", airName);
	// 	const airDb = await getDoc(airDoc);

	// 	// const airDb = await firestore
	// 	// 	.collection("Aircrafts")
	// 	// 	.doc(String(aircraftName))
	// 	// 	.get();

	// 	this.setState({
	// 		airName: airDb.id,
	// 		ze: airDb.data().Ze,
	// 		xe: airDb.data().Xe,
	// 		lookdown: airDb.data().lookdown,
	// 		za: airDb.data().Za,
	// 		xa: airDb.data().Xa,
	// 		flaps: airDb.data().flaps,
	// 		speed: airDb.data().speed,
	// 		weight: airDb.data().weight,
	// 		cg: airDb.data().cg,
	// 		pitch: airDb.data().pitch,
	// 		airUnits: String(airDb.data().unitsAir),
	// 	});
	// 	// } catch (error) {
	// 	// 	console.log("Unable to retrieve the doc", error);
	// 	// }
	// }
	render() {
		console.log("OutputVisual xAhead: " + this.props.xahead);
		console.log("OutputVisual xBeyond: " + this.props.xbeyond);

		if (this.props.runwayName == "" || this.props.aircraftName == "") {
			return <Navigate to='/Dashboard' />;
		} else {
			return (
				<div>
					{/* Component to print */}
					<Stage
						style={{
							backgroundColor: "tan",
							marginTop: 80,
							marginLeft: 0,
							marginRight: 0,
							height: "450px",
							width: "1300px",
						}}
						width={this.state.stageWidth}
						height={this.state.stageHeight}
					>
						{/* <Layer style={{ padding: 55 }}> */}
						<Layer>
							<Runway
								runWidth={this.state.runWidth}
								runLength={this.state.runLength}
							/>
							<LightType approachlights={this.state.approachlights} />
							<ThresholdLights />
							<ThresholdBars runwidth={this.state.width} />
							<RunwayMarkingsDraw edgespacing={this.state.edgespacing} />
							<GroundSegmentRender
								xahead={this.props.xahead}
								xbeyond={this.props.xbeyond}
							/>
						</Layer>
					</Stage>
					{/* <img src={outputImg} alt="Output Variable Chart" /> */}
				</div>
			);
		}
	}
}
export { Runway };
export default OutputVisuals;
