import React, { Component } from "react";
import { Button, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import OutputVisuals from "./OutputVisual";
import outputImg from "../img/Outputs Variable chart.png";
import inputPlane from "../img/PlaneSide.jpg";
import inputHeli from "../img/HeliSide.jpg";
import ReactToPrint, { useReactToPrint } from "react-to-print";
//-------------Expermintal calculations function---------//

class ManageVGS extends Component {
	state = {
		color: "gray",
		stageWidth: 1000,
		stageHeight: 400,
		//Setting state for Calculation variables via props
		//So they can be used in any tab
		airType: this.props.aircraftType, // Need to use for rendering the correct aircraft picture in the input tab
		dh: this.props.runwayDh,
		glideSlope: this.props.runwayGlideSlope,
		xa: this.props.aircraftXa,
		xe: this.props.aircraftXe,
		za: this.props.aircraftZa,
		ze: this.props.aircraftZe,
		pitch: this.props.aircraftPitch,
		gsx: this.props.runwayGsx,
		gsy: this.props.runwayGsy,
		lookdown: this.props.aircraftLookdown,
		xrvr: 1200,
		tch: this.props.runwayTch,
		fovS: "",
		zegS: "",
		zagS: "",
		xanteyeS: "",
		obsegS: "",
		xthres0S: "",
		xthresrealS: "",
		xeyethres0S: "",
		xeyethres0TCHS: "",
		xeyethresreal: "",
		xeyethresrealTCHS: "",
		gndrvrS: "",
		xax0S: "",
		xaxrealS: "",
		xcutoffS: "",
		xahead0S: "",
		xaheadrealS: "",
		xahead0TCHS: "",
		xaheadrealTCHS: "",
		xbeyond0S: "",
		xbeyondrealS: "",
		xbeyond0TCHS: "",
		xbeyondrealTCHS: "",
		xaheadGndRndr: "",
		xbeyondGndRndr: "",
		xahead0GS: "",
		xahead0TCHGS: "",
		xaheadrealGS: "",
		xaheadrealTCHGS: "",
		xbeyond0GS: "",
		xbeyond0TCHGS: "",
		xbeyondrealGS: "",
		xbeyondrealTCHGS: "",
		runwayWidthGS: "",
		units: "Imperial",
		canConvert: false,
		calcChoice: "realCal" /**Choices are, 0Cal, realCal, 0TCH, realTCH */,
		_isMounted: false,
	};

	constructor(props) {
		super(props);
		this.calculateVGS = this.calculateVGS.bind(this);
	}

	componentDidMount() {
		this.state._isMounted = true;

		if (this.state._isMounted) {
			this.calculateVGS();
			console.log("Component has mounted");
		} else {
			console.log("component did not mount");
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	showAircraft(param) {
		console.log("aircraft type: " + param);

		switch (param) {
			case "plane":
				console.log("showing an airplane image");
				return <Image src={inputPlane} alt='Input Aircraft as Airplane' />;
			case "heli":
				console.log("showing a helicopter image");
				return <Image src={inputHeli} alt='Input Aircraft as Helicopter' />;
			case "other":
				return "Alien Spacecraft";
			default:
				return "Invalid aircraft type";
		}
	}
	// showPlane() {
	// 	return
	// }

	// showHeli() {
	// 	return
	// }

	calculateVGS() {
		let radToDeg = Math.PI / 180; // Anywhere this variable is found can be switched back to this math if needed.
		console.log(
			"The lookdown and pitch values in calc VGS are: ",
			this.state.lookdown,
			this.state.pitch
		);
		let xcutoff = this.state.lookdown - this.state.pitch;

		// Calculate Eye Distance to Ground modified by AC pitch at Decision Height
		let zeg =
			this.state.dh +
			this.state.ze * Math.cos(this.state.pitch * radToDeg) +
			this.state.xe * Math.sin(this.state.pitch * radToDeg);
		//Calculate antenna distance to ground modified by pitch at decision heights
		let zag =
			this.state.dh +
			this.state.za * Math.cos(this.state.pitch * radToDeg) +
			this.state.xa * Math.sin(this.state.pitch * radToDeg);
		//Calculate ground distance from AC antenna to eye
		let xanteye =
			(this.state.xa - this.state.xe) * Math.cos(this.state.pitch * radToDeg) +
			(this.state.ze - this.state.za) * Math.sin(this.state.pitch * radToDeg);
		//Calculate the obscured segment
		let obseg = zeg / Math.tan(xcutoff * radToDeg);
		//Calculate ground RVR
		let gndrvr = Math.sqrt(Math.pow(this.state.xrvr, 2) - Math.pow(zeg, 2));
		//calculate the field of view
		let fov = gndrvr - obseg;

		//function to calculate the distance from the AC antenna to GS TX accounting for TX lateral offset with hard coded 3 degree glide slope
		// let xax = Math.sqrt(
		// 	Math.pow(zag / Math.tan((3(this value is the typical glideslope) * Math.PI) / 180), 2) -
		// 		Math.pow(this.state.gsy, 2)
		// );
		//function to calculate the distance from the AC antenna to GS TX accounting for TX lateral offset i.e. Y Offset = real world
		let xaxreal = Math.sqrt(
			Math.pow(zag / Math.tan(radToDeg * this.state.glideSlope), 2) -
				Math.pow(this.state.gsy, 2)
		);
		//function to calculate distance from AC antenna to GS Tx with no lateral offset i.e. Y Offset = zero
		let xax0 = zag / Math.tan(radToDeg * this.state.glideSlope);

		let xthres0 = xax0 - this.state.gsx;
		let xthresreal = xaxreal - this.state.gsx;
		let xeyethres0 = xthres0 + xanteye;
		let xeyethresreal = xthresreal + xanteye;
		let xahead0 = xthres0 - obseg;
		let xbeyond0 = fov - Math.abs(xahead0);
		let xaheadreal = xthresreal - obseg;
		let xbeyondreal = fov - Math.abs(xaheadreal);

		//calculate GS Tx Offset to Threshold based on published TCH
		let gsxOffsetTCH =
			this.state.tch /*need to pass in this value */ /
			Math.tan(this.state.glideSlope * radToDeg);

		//calculate distance from pilot eye to the threshold of the runway based on the published TCH assuming GS TX is on runway centerline
		let xeyethres0TCH = xax0 - gsxOffsetTCH + xanteye;

		//calculate ahead and beyond segment values assuming GS TX is on runway CL using published TCH
		let xahead0TCH = xeyethres0TCH - obseg;
		let xbeyond0TCH = fov - xahead0TCH;

		//calculate antenna to threshold distance accounting for lateral offset using published TCH
		let xeyethresrealTCH = xaxreal - gsxOffsetTCH + xanteye;

		//calculate ahead and beyond segment values assuming GS TX lateral offset using the published TCH
		let xaheadrealTCH = xeyethresrealTCH - obseg;
		let xbeyondrealTCH = fov - xaheadrealTCH;

		this.setState(
			{
				zegS: zeg,
				zagS: zag,
				fovS: fov,
				xanteyeS: xanteye,
				obsegS: obseg,
				xthres0S: xthres0,
				xthresrealS: xthresreal,
				xeyethres0S: xeyethres0,
				xeyethres0TCHS: xeyethres0TCH,
				xeyethresrealS: xeyethresreal,
				xeyethresrealTCHS: xeyethresrealTCH,
				gndrvrS: gndrvr,
				xax0S: xax0,
				xaxrealS: xaxreal,
				xcutoffS: xcutoff,
				xahead0S: xahead0,
				xahead0TCHS: xahead0TCH,
				xaheadrealS: xaheadreal,
				xaheadrealTCHS: xaheadrealTCH,
				xbeyond0S: xbeyond0,
				xbeyondrealS: xbeyondreal,
				xbeyond0TCHS: xbeyond0TCH,
				xbeyondrealTCHS: xbeyondrealTCH,
				xahead0GS: xahead0,
				xahead0TCHGS: xahead0TCH,
				xaheadrealGS: xaheadreal,
				xaheadrealTCHGS: xaheadrealTCH,
				xbeyond0GS: xbeyond0,
				xbeyond0TCHGS: xbeyond0TCH,
				xbeyondrealGS: xbeyondreal,
				xbeyondrealTCHGS: xbeyondrealTCH,
				decisionHeight: this.props.runwayDh,
				// runwayWidthGS:this.props.runwayWidth,
			},
			() => {
				console.log("xcutoff: " + this.state.xcutoffS);
				console.log("zeg: " + this.state.zegS);
				console.log("zag: " + this.state.zagS);
				console.log("xanteye: " + this.state.xanteyeS);
				console.log("obseg: " + this.state.obsegS);
				console.log("gndrvr: " + this.state.gndrvrS);
				console.log("fov: " + this.state.fovS);
				console.log("glideslope: " + this.state.glideSlope);
				console.log("decision Height: " + this.state.dh);
				console.log(
					"Measurement units from Runway are in: " + this.props.runwayUnits
				);
				console.log(
					"Measurement units from Aircraft are in: " + this.props.airType
				);
			}
		);
		// console.log("----------Start Variables in ManageVGS calculated----------");

		// console.log("-----------End Variables in ManageVGS calculated----------");

		/* The methods of calculating the VGS vary based on a combination of two things, Whether the lateral position of the Ground Transmitter station
		 * is being taken into consideration and whether the calculated or published TCH is being used. Below are the variables for each of
		 * of the 4 combinations of these calculations */
		//------------------0 Offset, Calculated TCH Variables Begin------------------------------------------------------------//
		/**
		 * xax0
		 * xthres0
		 * xeyethres0
		 * xahead0
		 * xbeyond0
		 */

		//------------------0 Offset, Calculated TCH Variables End------------------------------------------------------------//

		//------------------Real Offset, Calculated TCH Variables Begin------------------------------------------------------------//
		/**
		 * xaxreal
		 * xthresreal
		 * xeyethresreal
		 * xaheadreal
		 * xbeyondreal
		 */
		//------------------Real Offset, Calculated TCH Variables End------------------------------------------------------------//

		//------------------0 Offset, Published TCH Variables ------------------------------------------------------------//
		/**
		 * xeyethres0TCH
		 * xahead0TCH
		 * xbeyond0TCH
		 */
		//------------------0 Offset, Published TCH Variables ------------------------------------------------------------//

		//------------------Real Offset, Published TCH Variables ------------------------------------------------------------//
		/**
		 * xeyethresrealTCH
		 * xaheadrealTCH
		 * xbeyondrealTCH
		 */
		//------------------Real Offset, Published TCH Variables ------------------------------------------------------------//
	}

	//------------------This is where Runway function was -------------------------------------------------------------//
	xaheadRnd(choice) {
		switch (choice) {
			case "0Cal":
				//console.log("Showing Xahead 0 offset with calculated TCH");
				return this.state.xahead0GS;
			case "realCal":
				//console.log("Showing Xahead real offset with calculated TCH");
				return this.state.xaheadrealGS;
			case "0TCH":
				//console.log("Showing Xahead 0 offset with published TCH");
				return this.state.xahead0TCHGS;
			case "realTCH":
				//console.log("Showing Xahead real offset with published TCH");
				return this.state.xaheadrealTCHGS;
			default:
				return this.state.xahead0GS;
		}
	}

	xbeyondRnd(choice) {
		switch (choice) {
			case "0Cal":
				//console.log("Showing Xbeyond 0 offset with calculated TCH");
				return this.state.xbeyond0GS;
			case "realCal":
				//console.log("Showing Xbeyond real offset with calculated TCH");
				return this.state.xbeyondrealGS;
			case "0TCH":
				//console.log("Showing Xbeyond 0 offset with published TCH");
				return this.state.xbeyond0TCHGS;
			case "realTCH":
				//console.log("Showing Xbeyond real offset with published TCH");
				return this.state.xbeyondrealTCHGS;
			default:
				return this.state.xbeyond0GS;
		}
	}
	xaheadChoose(choice) {
		switch (choice) {
			case "0Cal":
				//console.log("Showing Xahead 0 offset with calculated TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xahead0S * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xahead0S * 0.3048)
				// } else {
				return this.state.xahead0S;
			//}
			case "realCal":
				//console.log("Showing Xahead real offset with calculated TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xaheadrealS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xaheadrealS * 0.3048)
				// } else {
				return this.state.xaheadrealS;
			//}
			case "0TCH":
				//console.log("Showing Xahead 0 offset with published TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xahead0TCHS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xahead0TCHS * 0.3048)
				// } else {
				return this.state.xahead0TCHS;
			//}
			case "realTCH":
				//console.log("Showing Xahead real offset with published TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xaheadrealTCHS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xaheadrealTCHS * 0.3048)
				// } else {
				return this.state.xaheadrealTCHS;
			//}
			default:
				return this.state.xahead0S;
		}
	}

	xbeyondChoose(choice) {
		switch (choice) {
			case "0Cal":
				//console.log("Showing Xbeyond 0 offset with calculated TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xbeyond0S * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xbeyond0S * 0.3048)
				// } else {
				return this.state.xbeyond0S;
			//}
			case "realCal":
				//console.log("Showing Xbeyond real offset with calculated TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xbeyondrealS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xbeyondrealS * 0.3048)
				// } else {
				return this.state.xbeyondrealS;
			//}
			case "0TCH":
				//console.log("Showing Xbeyond 0 offset with published TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xbeyond0TCHS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xbeyond0TCHS * 0.3048)
				// } else {
				return this.state.xbeyond0TCHS;
			//}
			case "realTCH":
				//sconsole.log("Showing Xbeyond real offset with published TCH");
				// if(this.state.units == "Imperial" && this.state.canConvert == true){
				// 	return (this.state.xbeyondrealTCHS * 3.281)
				// } else if(this.state.units == 'Metric') {
				// 	return (this.state.xbeyondrealTCHS * 0.3048)
				// } else {
				return this.state.xbeyondrealTCHS;
			//}
			default:
				return this.state.xbeyond0S;
		}
	}

	convertUnits(val) {
		/**This function will take in the passed in value and convert between imperial or metric depending on
		 * the current unit choice and the canConvert variable for first time metric variable
		 */
		let units = this.state.units;
		// if(this.state.canConvert) {
		// 	switch(units) {
		// 		case 'Metric':
		// 			return (val * 0.3048)
		// 		case 'Imperial':
		// 			return (val * 3.281)
		// 		default:
		// 			return val
		// 	}
		// }
		// if(val == 100 && this.state.units == 'Metric'){
		// 	return (val * 0.3048)
		// }
		// if(val == 100 && this.state.units == 'Imperial') {
		// 	return val
		// }
		if (units == "Imperial" && this.state.canConvert == true) {
			return val * 3.281;
		} else if (this.state.units == "Metric") {
			return val * 0.3048;
		} else {
			return val;
		}
	}

	convertToImperial() {
		// This method is called to convert all currently used values to Imperial.
		let zegI = this.state.zegS * 3.281;
		let zagI = this.state.zagS * 3.281;
		let fovI = this.state.fovS * 3.281;
		let xanteyeI = this.state.xanteyeS * 3.281;
		let obsegI = this.state.obsegS * 3.281;
		let xthres0I = this.state.xthre0S * 3.281;
		let xthresrealI = this.state.xthresrealS * 3.281;
		let xeyethres0I = this.state.xeyethres0S * 3.281;
		let xeyethres0TCHI = this.state.xeyethres0TCHS * 3.281;
		let xeyethresrealI = this.state.xeyethresrealS * 3.281;
		let xeyethresrealTCHI = this.state.xeyethresrealTCHS * 3.281;
		let xrvrI = this.state.xrvrS * 3.281;
		let gndrvrI = this.state.gndrvrS * 3.281;
		let xax0I = this.state.xax0S * 3.281;
		let xaxrealI = this.state.xaxrealS * 3.281;
		let xcutoffI = this.state.xcutoffS * 3.281;
		let TCHI = this.state.TCH * 3.281;
		let xahead0I = this.state.xahead0S * 3.281;
		let xahead0TCHI = this.state.xahead0TCHS * 3.281;
		let xaheadrealI = this.state.xaheadrealS * 3.281;
		let xaheadrealTCHI = this.state.xaheadrealTCHS * 3.281;
		let xbeyond0I = this.state.xbeyond0S * 3.281;
		let xbeyondrealI = this.state.xbeyondrealS * 3.281;
		let xbeyond0TCHI = this.state.xbeyond0TCHS * 3.281;
		let xbeyondrealTCHI = this.state.xbeyondrealTCHS * 3.281;
		let decisionHeightI = this.state.decisionHeight * 3.281;

		this.setState({
			zegS: zegI,
			zagS: zagI,
			fovS: fovI,
			xanteyeS: xanteyeI,
			obsegS: obsegI,
			xthres0S: xthres0I,
			xthresrealS: xthresrealI,
			xeyethres0S: xeyethres0I,
			xeyethres0TCHS: xeyethres0TCHI,
			xeyethresrealS: xeyethresrealI,
			xeyethresrealTCHS: xeyethresrealTCHI,
			xrvr: xrvrI,
			gndrvrS: gndrvrI,
			xax0S: xax0I,
			xaxrealS: xaxrealI,
			xcutoffS: xcutoffI,
			TCH: TCHI,
			xahead0S: xahead0I,
			xahead0TCHS: xahead0TCHI,
			xaheadrealS: xaheadrealI,
			xaheadrealTCHS: xaheadrealTCHI,
			xbeyond0S: xbeyond0I,
			xbeyondrealS: xbeyondrealI,
			xbeyond0TCHS: xbeyond0TCHI,
			xbeyondrealTCHS: xbeyondrealTCHI,
			decisionHeight: decisionHeightI,
		});
	}

	convertToMetric() {
		// This method is called to convert all currently used values to Metric
		let zegI = this.state.zegS * 0.3048;
		let zagI = this.state.zagS * 0.3048;
		let fovI = this.state.fovS * 0.3048;
		let xanteyeI = this.state.xanteyeS * 0.3048;
		let obsegI = this.state.obsegS * 0.3048;
		let xthres0I = this.state.xthre0S * 0.3048;
		let xthresrealI = this.state.xthresrealS * 0.3048;
		let xeyethres0I = this.state.xeyethres0S * 0.3048;
		let xeyethres0TCHI = this.state.xeyethres0TCHS * 0.3048;
		let xeyethresrealI = this.state.xeyethresrealS * 0.3048;
		let xeyethresrealTCHI = this.state.xeyethresrealTCHS * 0.3048;
		let xrvrI = this.state.xrvrS * 0.3048;
		let gndrvrI = this.state.gndrvrS * 0.3048;
		let xax0I = this.state.xax0S * 0.3048;
		let xaxrealI = this.state.xaxrealS * 0.3048;
		let xcutoffI = this.state.xcutoffS * 0.3048;
		let TCHI = this.state.TCH * 0.3048;
		let xahead0I = this.state.xahead0S * 0.3048;
		let xahead0TCHI = this.state.xahead0TCHS * 0.3048;
		let xaheadrealI = this.state.xaheadrealS * 0.3048;
		let xaheadrealTCHI = this.state.xaheadrealTCHS * 0.3048;
		let xbeyond0I = this.state.xbeyond0S * 0.3048;
		let xbeyondrealI = this.state.xbeyondrealS * 0.3048;
		let xbeyond0TCHI = this.state.xbeyond0TCHS * 0.3048;
		let xbeyondrealTCHI = this.state.xbeyondrealTCHS * 0.3048;
		let decisionHeightI = this.props.runwayDh * 0.3048;

		this.setState({
			zegS: zegI,
			zagS: zagI,
			fovS: fovI,
			xanteyeS: xanteyeI,
			obsegS: obsegI,
			xthres0S: xthres0I,
			xthresrealS: xthresrealI,
			xeyethres0S: xeyethres0I,
			xeyethres0TCHS: xeyethres0TCHI,
			xeyethresrealS: xeyethresrealI,
			xeyethresrealTCHS: xeyethresrealTCHI,
			xrvr: xrvrI,
			gndrvrS: gndrvrI,
			xax0S: xax0I,
			xaxrealS: xaxrealI,
			xcutoffS: xcutoffI,
			TCH: TCHI,
			xahead0S: xahead0I,
			xahead0TCHS: xahead0TCHI,
			xaheadrealS: xaheadrealI,
			xaheadrealTCHS: xaheadrealTCHI,
			xbeyond0S: xbeyond0I,
			xbeyondrealS: xbeyondrealI,
			xbeyond0TCHS: xbeyond0TCHI,
			xbeyondrealTCHS: xbeyondrealTCHI,
			decisionHeight: decisionHeightI,
		});

		const handlePrint = useReactToPrint({
			content: () => {},
		});
	}

	render() {
		return (
			//-------Tab Layout---------//
			<Tabs defaultActiveKey='outputs' id='data-tabs' fill>
				<Tab eventKey='outputs' title='Output' className='nav-justified'>
					<Container ref={(el) => (this.componentRef = el)}>
						<Row>
							<Col md={3}>
								<label className='outputlabel'>
									Aircraft: {this.props.aircraftName}{" "}
								</label>
								<br />
								<label className='outputlabel'>
									Runway: {this.props.runwayIcao}{" "}
								</label>
							</Col>
							<Col md={3}>
								<label className='outputlabel' style={{ paddingRight: "20px" }}>
									Units in: {this.state.units}
								</label>
								<Button
									variant='secondary'
									onClick={() => {
										switch (this.state.units) {
											case "Metric":
												//call conversion to Imperial method and update all values at this time
												this.convertToImperial();
												this.setState({ units: "Imperial" });
												break;
											case "Imperial":
												//call conversion to Metric method and update all values at this time
												this.convertToMetric();
												this.setState({ units: "Metric", canConvert: true });
												break;
										}

										console.log(
											"Button has changed units to" + this.state.units
										);
									}}
								>
									Change Units
								</Button>
								<br />
								<label className='outputlabel'>
									Rendered on: {/*({Date})*/}
								</label>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<label className='outputLabel'>
									xAhead:{" "}
									{Number(this.xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
							<Col md={3}>
								<label className='outputLabel'>
									xBeyond:{" "}
									{Number(this.xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
							</Col>
							<Col md={4}>
								<label className='outputLabel'>
									FOV: {Number(this.state.fovS).toFixed(2)}
								</label>
							</Col>
						</Row>
						<Row className='justify-center'>
							<Col md={2}>
								<Button
									variant='primary'
									onClick={() => {
										this.setState({ calcChoice: "0Cal" });
									}}
								>
									0 Offset: Calc TCH
								</Button>
							</Col>
							<Col md={2}>
								<Button
									variant='primary'
									onClick={() => {
										this.setState({ calcChoice: "realCal" });
									}}
								>
									real Offset: Calc TCH
								</Button>
							</Col>
							<Col md={2}>
								<Button
									variant='primary'
									onClick={() => {
										this.setState({ calcChoice: "0TCH" });
									}}
								>
									0 Offset: Pub TCH
								</Button>
							</Col>
							<Col md={2}>
								<Button
									variant='primary'
									onClick={() => {
										this.setState({ calcChoice: "realTCH" });
									}}
								>
									real Offset: Pub TCH
								</Button>
							</Col>
						</Row>
						{/* attempt to create print button*/}
						<Row>
							<Col md={3} className='justify-content-end'>
								<ReactToPrint
									trigger={() => <Button> Print chart </Button>}
									// content={ () => {
									// 	const
									// }}

									// }
									content={() => this.componentRef}
									//content={() => this.handlePrint}
								/>
							</Col>
						</Row>
						<Container
							style={{
								//height: "300px",
								//width: "100%",
								//margin: 0,
								padding: 0,
							}}
							className='container-fluid'
						>
							<Row className='justify-content-md-center'>
								<Col>
									<OutputVisuals
										style={{ height: "500px", width: "1000px" }}
										runwayName={this.props.runwayName}
										aircraftName={this.props.aircraftName}
										xahead={this.xaheadRnd(this.state.calcChoice)}
										xbeyond={this.xbeyondRnd(this.state.calcChoice)}
										runwayLights={this.props.runwayLights}
										runwayEdgeSpacing={this.props.runwayEdgeSpacing}
										runwayWidth={this.props.runwayWidth}
										//ref={(el) => (this.componentRef = el)}
										// runwayIcao={this.props.runwayIcao}
										// runwayDh={this.props.runwayDh}
										// runwayGsx={this.props.runwayGsx}
										// runwayGsy={this.props.runwayGsy}
										// runwayGlideSlope={this.props.runwayGlideSlope}
										// runwayTch={this.props.runwayTch}
										// runwayUnits={this.props.runwayUnits}
										// aircraftXa={this.props.aircraftXa}
										// aircraftXe={this.props.aircraftXe}
										// aircraftZa={this.props.aircraftZa}
										// aircraftZe={this.props.aircraftZe}
										// aircraftCg={this.props.aircraftCg}
										// aircraftFlaps={this.props.aircraftFlaps}
										// aircraftLookdown={this.props.aircraftLookdown}
										// aircraftPitch={this.props.aircraftPitch}
										// aircraftSpeed={this.props.aircraftSpeed}
										// aircraftWeight={this.props.aircraftWeight}
										// aircraftUnits={this.props.aircraftUnits}
									></OutputVisuals>
								</Col>
							</Row>
						</Container>
					</Container>
					<Container>
						<Row>
							<Col md={4}>
								<img src={outputImg} alt='Output Variable Chart' />
							</Col>
							<Col md={4}>
								<label className='paramlabel'>
									Decision Height:{" "}
									{Number(this.state.decisionHeight).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Pilot&#39;s eye above ground(zeg):{" "}
									{/* Trying to add HTML escape code in place of apostrophe */}
									{Number(this.state.zegS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Ground Segment antenna above ground(zag):{" "}
									{Number(this.state.zagS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Horizontal distance of eye ground segment(xanteye):{" "}
									{Number(this.state.xanteyeS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Obscured Segment (obseg):{" "}
									{Number(this.state.obsegS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/*Add logic for Calculated/Published TCH with 0/real offsets buttons */}
									Aircraft ground segment to Threshold(xthres):{" "}
									{Number(this.state.xthresrealS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Eyepoint to threshold(xeyethres):{" "}
									{Number(this.state.xeyethresrealS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Slant RVR(xrvr): {this.state.xrvr}{" "}
								</label>
							</Col>
							<Col md={4}>
								<label className='paramlabel'>
									Effective ground rvr(gndrvr){" "}
									{Number(this.state.gndrvrS).toFixed(2)}
								</label>
								<br />
								{/* <label className='outputlabel'>
								Slant rvr(xrvr) {this.state.runwayUnits}
							</label>
							<br /> */}
								<label className='paramlabel'>
									Threshold crossing height(TCH): {this.props.runwayTch}
								</label>
								<br />
								<label className='paramlabel'>
									Field of view(FOV) {Number(this.state.fovS).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Transmitter antenna horizontal offset(xax){" "}
									{Number(this.state.xaxrealS).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(this.state.xcutoffS)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Visible before threshold(xahead){" "}
									{Number(this.xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Visible after threshold(xbeyond){" "}
									{Number(this.xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
						</Row>
					</Container>
				</Tab>
				<Tab eventKey='inputs' title='Input'>
					<Container>
						<Row>
							<Col md={6}>
								<label>
									Aircraft <br /> {this.props.aircraftName}
								</label>
							</Col>
							<Col md={6}>
								<label>
									Runway <br /> {this.props.runwayIcao}
								</label>
							</Col>
						</Row>
					</Container>
					<Container>{this.showAircraft(this.state.airType)}</Container>

					<Container>
						<Row>
							<label className='paramlabel'>ze: {this.props.aircraftZe} </label>
						</Row>
						<Row>
							<label className='paramlabel'>xe: {this.props.aircraftXe} </label>
						</Row>
						<Row>
							<label className='paramlabel'>za: {this.props.aircraftZa} </label>
						</Row>
						<Row>
							<label className='paramlabel'>xa: {this.props.aircraftXa} </label>
						</Row>
						<Row>
							<label className='paramlabel'>
								pitch angle: {this.props.aircraftPitch}{" "}
							</label>
						</Row>
						<Row>
							<label className='paramlabel'>
								max lookdown: {this.props.aircraftLookdown}{" "}
							</label>
						</Row>
						<br />
						<br />
						<Row>
							<Col md={2}>
								<label className='inputLabel2'>
									Aircraft Weight <br /> {this.props.aircraftWeight}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									Aircraft Speed <br /> {this.props.aircraftSpeed}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									%CG <br /> {this.props.aircraftCg}
								</label>
							</Col>
							<Col md={2}>
								<label className='inputLabel2'>
									Flaps Setting <br /> {this.props.aircraftFlaps}
								</label>
							</Col>
						</Row>
					</Container>
				</Tab>
				{/* <Tab eventKey='aircraft-location' title='Aircraft Location'></Tab> */}
				<Tab eventKey='parameters' title='Parameters'>
					<Container>
						<img src={outputImg} alt='Output Variable Chart' />

						<Row>
							<Col md={6}>
								<label className='paramlabel'>
									Decision Height: {this.props.runwayDh}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Pilot's eye above ground(zeg):{" "}
									{Number(this.state.zegS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Ground Segment antenna above ground(zag):{" "}
									{Number(this.state.zagS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Horizontal distance of eye ground segment(xanteye):{" "}
									{Number(this.state.xanteyeS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									Obscured Segment (obseg):{" "}
									{Number(this.state.obsegS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Aircraft ground segment to Threshold(xthres):{" "}
									{Number(this.state.xthresrealS).toFixed(2)}{" "}
								</label>
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Eyepoint to threshold(xeyethres):{" "}
									{Number(this.state.xeyethresrealS).toFixed(2)}{" "}
								</label>
								<br />
								<label className='paramlabel'>
									Slant RVR(xrvr): {this.state.xrvr}{" "}
								</label>
							</Col>
							<Col md={6}>
								<label className='paramlabel'>
									Effective ground rvr(gndrvr){" "}
									{Number(this.state.gndrvrS).toFixed(2)}
								</label>
								<br />
								{/* <label className='outputlabel'>
								Slant rvr(xrvr) {this.state.runwayUnits}
							</label>
							<br /> */}
								<label className='paramlabel'>
									Threshold crossing height(TCH): {this.props.runwayTch}
								</label>
								<br />
								<label className='paramlabel'>
									Field of view(FOV) {Number(this.state.fovS).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Transmitter antenna horizontal offset(xxmtr){" "}
									{Number(this.state.xaxrealS).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									Cutoff angle(xcutoff) {Number(this.state.xcutoffS)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Visible before threshold(xahead){" "}
									{Number(this.xaheadChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
								<label className='paramlabel'>
									{" "}
									{/**Button Logic */}
									Visible after threshold(xbeyond){" "}
									{Number(this.xbeyondChoose(this.state.calcChoice)).toFixed(2)}
								</label>
								<br />
							</Col>
						</Row>
					</Container>
				</Tab>
			</Tabs>
		);
	}
}

export default ManageVGS;
