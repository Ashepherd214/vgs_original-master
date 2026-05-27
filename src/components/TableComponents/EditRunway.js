import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firestore from "../../Firestore";
import { Formik, Field, ErrorMessage } from "formik";

class EditRunway extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.select = [props.select];
		this.closeEdit = props.closeEdit;
		this.selectName = props.name;
		this.state = {
			runName: " ",
			icao: " ",
			approachlights: " ",
			dh: " ",
			edgespacing: " ",
			gsx: " ",
			gsy: " ",
			glideslope: " ",
			tch: " ",
			width: " ",
			units: false,
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.loadCurrentValues = this.loadCurrentValues.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		this.loadCurrentValues();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	loadCurrentValues = () => {
		const select = this.props.name;
		const selString = select[0].toString();

		const runRef = firestore.collection("Runways").doc(selString);

		runRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.setState({
						runName: doc.id,
						icao: doc.data().ICAO,
						approachlights: doc.data().ApproachLights,
						dh: doc.data().DH,
						edgespacing: doc.data().EdgeSpacing,
						gsx: doc.data().GSOffsetX,
						gsy: doc.data().GSOffsetY,
						glideslope: doc.data().GlideSlope,
						tch: doc.data().TCH,
						width: doc.data().Width,
						units: doc.data().Units,
					});
					console.log("loaded approach lights: " + this.state.approachlights);
				} else {
					console.log("No such document!");
				}
			})
			.catch(function(error) {
				console.log("Error getting document: ", error);
			});
	};

	updateRunway = (values) => {
		const select = this.selectName;
		const selString = select[0].toString();

		const db = firestore.collection("Runways");
		//const select = db.doc(selString) old name
		//const select = db.doc(values.acName) form edit name
		//compare old name to form name. If same update, if different
		console.log("Current Runway in Form: ", values.runName);
		console.log(
			"Current Runway approach lights in Form: ",
			values.approachlights
		);
		console.log("Runway information from cloud: ", db.id.toString());

		if (db.doc(selString).id.toString() === values.runName) {
			db.doc(selString).update({
				ApproachLights: String(values.approachlights),
				DH: Number(values.dh),
				EdgeSpacing: Number(values.edgespacing),
				GSOffsetX: Number(values.gsx),
				GSOffsetY: Number(values.gsy),
				GlideSlope: Number(values.glideslope),
				ICAO: String(values.icao),
				TCH: Number(values.tch),
				Units: Boolean(values.units),
				Width: Number(values.width),
			});
		} else {
			db.doc(values.runName).set({
				ApproachLights: String(values.approachlights),
				DH: Number(values.dh),
				EdgeSpacing: Number(values.edgespacing),
				GSOffsetX: Number(values.gsx),
				GSOffsetY: Number(values.gsy),
				GlideSlope: Number(values.glideslope),
				ICAO: String(values.icao),
				TCH: Number(values.tch),
				Units: Boolean(values.units),
				Width: Number(values.width),
			});
			db.doc(selString).delete();
		}

		// db.collection("Aircrafts")
		//   .doc(String(select))
	};

	handleSubmit = (values, actions) => {
		setTimeout(() => {
			this.updateRunway(values);
			//setSubmitting(false);
		}, 600);
		if (this._isMounted) {
			this.props.render();
			this.props.toggle();
		}
	};

	render() {
		//Need to find a way to save variable of the selected acName to pass
		//on submission so the aircraft can be found even if the acName is changed in the edit form.

		//onSubmit is not calling the inside function so I think without the prop in the <Form> component
		//it doesn't seem to be calling to my onSubmit method.
		console.log("loaded approach lights: " + this.state.approachlights);
		return (
			<div className='container'>
				<div className='row mb-5'>
					<div className='col-lg-12 text-center'>
						<h1 className='mt-5'>Edit Runway</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<Formik
							enableReinitialize={true}
							initialValues={{
								runName: this.state.runName,
								icao: this.state.icao,
								approachlights: this.state.approachlights,
								dh: this.state.dh,
								edgespacing: this.state.edgespacing,
								gsx: this.state.gsx,
								gsy: this.state.gsy,
								glideslope: this.state.glideslope,
								tch: this.state.tch,
								width: this.state.width,
								units: this.state.units,
							}}
							// validate={values => {
							//   const errors = {};
							//   if (!values.acName) {
							//     errors.acName = "Required";
							//   } else if (values.acName.length > 15) {
							//     errors.acName = "Must be 15 characters or less";
							//   }

							//   return errors;
							// }}
							onSubmit={this.handleSubmit}
						>
							{({
								touched,
								errors,
								isSubmitting,
								handleSubmit,
								handleChange,
								values,
							}) => (
								<Form onSubmit={handleSubmit}>
									<Form.Group controlId='editRunwayForm'>
										<Form.Label>
											Runway Name: The full name of the airport and the Runway
											with heading indicator
										</Form.Label>
										<Field
											value={values.runName}
											//defaultValue={values.acName}
											//onChange={this.setState({acName: values.acName})}
											id='runName'
											name='runName'
											type='text'
											placeholder={values.runName}
											className={`form-control ${
												touched.runName && errors.runName ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Runway ICAO: The four letter ICAO code representing the
											specified airport location
										</Form.Label>
										<Field
											value={values.icao}
											id='icao'
											name='icao'
											type='text'
											placeholder='Enter ICAO code'
											className={`form-control ${
												touched.icao && errors.icao ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Approach Lights: The type of Approach Lighting system used
											at the specified airport
										</Form.Label>
										<br />
										<Field
											as='select'
											value={values.approachlights}
											id='approachlights'
											name='approachlights'
											type='select'
										>
											<option value='' label='Select a lighting system' />
											<option value='ODALS' label='ODALS' />
											<option value='MALSR' label='MALSR' />
											<option value='MALSF' label='MALSF' />
											<option value='SSALR' label='SSALR' />
											<option value='SSALF' label='SSALF' />
											<option value='ALSF1' label='ALSF1' />
											<option value='ALSF2' label='ALSF2' />
											<option value='CALVERT' label='CALVERT' />
											<option value='CALVERT2' label='CALVERT2' />
											<option value='RAIL' label='RAIL' />
										</Field>
										<br />
										<Form.Label>
											Decision Height: Height of the main gear above the ground
											at the time the approach decision must be made{" "}
										</Form.Label>
										<Field
											value={values.dh}
											id='dh'
											name='dh'
											type='number'
											placeholder='Enter Decision Height'
											className={`form-control ${
												touched.dh && errors.dh ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Edge Light Spacing: The distance between edge lights down
											a given runway.
										</Form.Label>
										<Field
											value={values.edgespacing}
											id='edgespacing'
											name='edgespacing'
											type='number'
											placeholder='Enter Edge Light spacing'
											className={`form-control ${
												touched.edgespacing && errors.edgespacing
													? "is-invalid"
													: ""
											}`}
										/>
										<br />
										<Form.Label>
											Antenna Distance from the Ruway Center Line
										</Form.Label>
										<Field
											value={values.gsx}
											id='gsx'
											name='gsx'
											type='number'
											placeholder='Enter GS Offset X value'
											className={`form-control ${
												touched.gsx && errors.gsx ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Antenna Distance from end of runway (starting at
											thresehold crossing lights)
										</Form.Label>
										<Field
											value={values.gsy}
											id='gsy'
											name='gsy'
											type='number'
											placeholder='Enter GS Offset Y value'
											className={`form-control ${
												touched.gsy && errors.gsy ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Threshold Crossing Height: The published height that an
											aircrafts Ground Segment antenna will cross the runway
											threshold
										</Form.Label>
										<Field
											value={values.tch}
											id='tch'
											name='tch'
											type='number'
											placeholder='Enter TCH value'
											className={`form-control ${
												touched.tch && errors.tch ? "is-invalid" : ""
											}`}
										/>
										<br />
										<Form.Label>
											Runway Width: The distance from one set of edge lights to
											the next set on a runway
										</Form.Label>
										<Field
											value={values.width}
											id='width'
											name='width'
											type='number'
											placeholder='Enter Runway Width'
											className={`form-control ${
												touched.width && errors.width ? "is-invalid" : ""
											}`}
										/>
										<br />
										<label htmlFor='unitsAir'>
											Unit of measurement for values entered
										</label>
										<br />
										<Field
											as='select'
											id='unitsRun'
											name='unitsRun'
											type='select'
											value={values.units}
											style={{ marginBottom: "10px" }}
										>
											<option value='true' label='Metric'>
												Metric
											</option>
											<option value='false' label='Imperial'>
												Imperial
											</option>
										</Field>
										<br />
										<button
											type='submit'
											className='btn btn-primary btn-block'
											disabled={isSubmitting}
										>
											{isSubmitting ? "Please wait..." : "Submit"}
										</button>
									</Form.Group>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default EditRunway;
