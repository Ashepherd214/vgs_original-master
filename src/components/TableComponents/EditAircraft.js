import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firestore from "../../Firestore";
import { Formik, Field, ErrorMessage } from "formik";
import ManageAircrafts from "../../VGS Objects/ManageAircrafts";

class EditAircraft extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.select = [props.select];
		this.closeEdit = props.closeEdit;
		this.selectName = props.name;
		this.state = {
			name: " ",
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
			airType: " ",
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

		const airRef = firestore.collection("Aircrafts").doc(selString);

		airRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.setState({
						name: doc.id,
						ze: doc.data().Ze,
						xe: doc.data().Xe,
						lookdown: doc.data().lookdown,
						za: doc.data().Za,
						xa: doc.data().Xa,
						flaps: doc.data().flaps,
						speed: doc.data().speed,
						weight: doc.data().weight,
						cg: doc.data().cg,
						pitch: doc.data().pitch,
						airType: doc.data().airType,
						units: doc.data().unitsAir,
					});
				} else {
					console.log("No such document!");
				}
			})
			.catch(function(error) {
				console.log("Error getting document: ", error);
			});
	};

	updateAircraft = (values) => {
		const select = this.selectName;
		const selString = select[0].toString();

		const db = firestore.collection("Aircrafts");
		//const select = db.doc(selString) old name
		//const select = db.doc(values.acName) form edit name
		//compare old name to form name. If same update, if different
		console.log("Current aircraft in Form: ", values.acName);
		console.log("Aircraft information from cloud: ", db.id.toString());

		if (db.doc(selString).id.toString() === values.acName) {
			db.doc(selString).update({
				Ze: Number(values.ze),
				Xe: Number(values.xe),
				lookdown: Number(values.lookdown),
				Za: Number(values.za),
				Xa: Number(values.xa),
				flaps: Number(values.flaps),
				speed: Number(values.speed),
				weight: Number(values.weight),
				cg: Number(values.cg),
				pitch: Number(values.pitch),
				airType: String(values.airType),
				unitsAir: Boolean(values.unitsAir),
			});
		} else {
			db.doc(values.acName).set({
				Ze: Number(values.ze),
				Xe: Number(values.xe),
				lookdown: Number(values.lookdown),
				Za: Number(values.za),
				Xa: Number(values.xa),
				flaps: Number(values.flaps),
				speed: Number(values.speed),
				weight: Number(values.weight),
				cg: Number(values.cg),
				pitch: Number(values.pitch),
				airType: String(values.airType),
				unitsAir: Boolean(values.unitsAir),
			});
			db.doc(selString).delete();
		}

		// db.collection("Aircrafts")
		//   .doc(String(select))
	};

	handleSubmit = (values, actions) => {
		setTimeout(() => {
			this.updateAircraft(values);
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

		return (
			<div className='container'>
				<div className='row mb-5'>
					<div className='col-lg-12 text-center'>
						<h1 className='mt-5'>Edit Aircraft</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<Formik
							enableReinitialize={true}
							initialValues={{
								acName: this.state.name,
								ze: this.state.ze,
								xe: this.state.xe,
								lookdown: this.state.lookdown,
								za: this.state.za,
								xa: this.state.xa,
								flaps: this.state.flaps,
								speed: this.state.speed,
								weight: this.state.weight,
								cg: this.state.cg,
								pitch: this.state.pitch,
								unitsAir: this.state.units,
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
								<form onSubmit={handleSubmit}>
									<Form.Group controlId='editForm'>
										<Form.Label>Aircraft Name</Form.Label>
										<Field
											value={values.acName}
											//defaultValue={values.acName}
											//onChange={this.setState({acName: values.acName})}
											name='acName'
											type='text'
											placeholder={values.acName}
											className={`form-control ${
												touched.acName && errors.acName ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Ze: The pilot's eye height above the main gear at a zero
											pitch angle
										</Form.Label>
										<Field
											value={values.ze}
											//defaultValue={values.ze}
											id='ze'
											name='ze'
											type='number'
											step='0.001'
											min='0'
											placeholder='Enter Ze value'
											className={`form-control ${
												touched.ze && errors.ze ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Xe: The distance from the Pilot's eye point to the main
											gear
										</Form.Label>
										<Field
											value={values.xe}
											id='xe'
											name='xe'
											type='number'
											step='0.001'
											min='0'
											//placeholder="Enter Xe value"
											className={`form-control ${
												touched.xe && errors.xe ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Lookdown Angle: The aircraft's lookdown angle
										</Form.Label>
										<Field
											value={values.lookdown}
											id='lookdown'
											name='lookdown'
											type='number'
											step='0.001'
											min='0'
											//placeholder="Enter lookdown value"
											className={`form-control ${
												touched.lookdown && errors.Lookdown ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Za: The Aircraft's Ground Segment Antenna height at a zero
											pitch angle
										</Form.Label>
										<Field
											value={values.za}
											id='za'
											name='za'
											type='number'
											step='0.001'
											min='0'
											//placeholder="Enter Za value"
											className={`form-control ${
												touched.za && errors.za ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Xa: The distance from the Aircraft's Ground Segment
											antenna to the main gear
										</Form.Label>
										<Field
											value={values.xa}
											id='xa'
											name='xa'
											type='number'
											step='0.001'
											min='0'
											//placeholder="Enter Xa value"
											className={`form-control ${
												touched.xa && errors.xa ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Flap setting: The Aircraft's flap setting for approach
										</Form.Label>
										<Field
											value={values.flaps}
											id='flaps'
											name='flaps'
											type='number'
											step='0.001'
											min='0'
											//placeholder="Enter Flaps setting"
											className={`form-control ${
												touched.flaps && errors.flaps ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Speed: The Aircraft's speed for approach
										</Form.Label>
										<Field
											value={values.speed}
											id='speed'
											name='speed'
											type='number'
											step='0.1'
											min='0'
											//placeholder="Enter Aircraft's speed"
											className={`form-control ${
												touched.speed && errors.speed ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Aircraft Weight: The Aircraft's total weight
										</Form.Label>
										<Field
											value={values.weight}
											id='weight'
											name='weight'
											type='number'
											min='0'
											//placeholder="Enter Aircraft's weight"
											className={`form-control ${
												touched.weight && errors.weight ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Center of Gravity: The center of gravity for the entire
											aircraft
										</Form.Label>
										<Field
											value={values.cg}
											id='cg'
											name='cg'
											type='number'
											step='0.1'
											min='0'
											//placeholder="Enter Aircraft's CG"
											className={`form-control ${
												touched.cg && errors.cg ? "is-invalid" : ""
											}`}
										/>

										<br />

										<Form.Label>
											Pitch Angle: The Aircraft's pitch angle on approach
										</Form.Label>
										<Field
											value={values.pitch}
											id='pitch'
											name='pitch'
											type='number'
											step='0.01'
											//placeholder="Enter Aircraft's pitch angle"
											className={`form-control ${
												touched.pitch && errors.pitch ? "is-invalid" : ""
											}`}
										/>

										<br />
										<label htmlFor='Measurment Units'>
											Unit of measurement values are being entered in
										</label>
										<br />
										<Field
											name='airType'
											as='select'
											id='airType'
											type='select'
											value={values.unitsAir}
										>
											<option value='plane' label='Airplane'>
												Metric
											</option>
											<option value='heli' label='Helicopter'>
												Imperial
											</option>
										</Field>
										<br />
										<Field
											name='unitsAir'
											as='select'
											id='unitsAir'
											type='select'
											value={values.unitsAir}
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
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default EditAircraft;
