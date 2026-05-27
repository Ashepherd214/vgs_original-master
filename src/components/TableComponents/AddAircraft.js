import React from "react";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import firestore from "../../Firestore";
import { Formik, Field, ErrorMessage } from "formik";
import ManageAircrafts from "../../VGS Objects/ManageAircrafts";

class AddAircraft extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ACName: " ",
			Ze: " ",
			Xe: " ",
			Lookdown: " ",
			Za: " ",
			Xa: " ",
			Flaps: " ",
			Speed: " ",
			Weight: " ",
			CG: " ",
			Pitch: " ",
			Units: false,
		};
	}

	addAircraft = (values) => {
		const db = firestore;
		console.log(values);
		db.collection("Aircrafts")
			.doc(String(values.acName))
			.set({
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
				unitsAir: Boolean(values.unitsAir),
			});
	};

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		setTimeout(() => {
			this.addAircraft(values);
			setSubmitting(false);
		}, 400);
		this.props.toggle();
	};

	render() {
		return (
			<div className='container'>
				<div className='row mb-6'>
					<div className='col-lg-12 text-center'>
						<h1 className='mt-5'>Add Aircraft</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<Formik
							initialValues={{
								acName: " ",
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
								unitsAir: true,
							}}
							validate={(values) => {
								const errors = {};
								if (!values.acName) {
									errors.acName = "Required";
								} else if (values.acName.length > 15) {
									errors.acName = "Must be 15 characters or less";
								}

								return errors;
							}}
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
									<label htmlFor='aircraft'>Aircraft Name</label>
									<Field
										value={values.name}
										id='acName'
										name='acName'
										type='text'
										placeholder='ex. A320'
										className={`form-control ${
											touched.acName && errors.acName ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Ze'>
										Ze: The pilot's eye height above the main gear at a zero
										pitch angle
									</label>
									<Field
										value={values.name}
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
									<label htmlFor='Xe'>
										Xe: The distance from the Pilot's eye point to the main gear
									</label>
									<Field
										value={values.name}
										id='xe'
										name='xe'
										type='number'
										step='0.001'
										min='0'
										placeholder='Enter Xe value'
										className={`form-control ${
											touched.xe && errors.xe ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Lookdown Angle'>
										Lookdown Angle: The aircraft's lookdown angle
									</label>
									<Field
										value={values.name}
										id='lookdown'
										name='lookdown'
										type='number'
										step='0.001'
										min='0'
										placeholder='Enter lookdown value'
										className={`form-control ${
											touched.lookdown && errors.Lookdown ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Za'>
										Za: The Aircraft's Ground Segment Antenna height at a zero
										pitch angle
									</label>
									<Field
										value={values.name}
										id='za'
										name='za'
										type='number'
										step='0.001'
										min='0'
										placeholder='Enter Za value'
										className={`form-control ${
											touched.za && errors.za ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Xa'>
										Xa: The distance from the Aircraft's Ground Segment antenna
										to the main gear
									</label>
									<Field
										value={values.name}
										id='xa'
										name='xa'
										type='number'
										step='0.001'
										min='0'
										placeholder='Enter Xa value'
										className={`form-control ${
											touched.xa && errors.xa ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Flaps'>
										Flap setting: The Aircraft's flap setting for approach
									</label>
									<Field
										value={values.name}
										id='flaps'
										name='flaps'
										type='number'
										min='0'
										placeholder='Enter Flaps setting'
										className={`form-control ${
											touched.flaps && errors.flaps ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Speed'>
										Speed: The Aircraft's speed for approach
									</label>
									<Field
										value={values.name}
										id='speed'
										name='speed'
										type='number'
										min='0'
										placeholder="Enter Aircraft's speed"
										className={`form-control ${
											touched.speed && errors.speed ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Weight'>
										Aircraft Weight: The Aircraft's total weight
									</label>
									<Field
										value={values.name}
										id='weight'
										name='weight'
										type='number'
										min='0'
										placeholder="Enter Aircraft's weight"
										className={`form-control ${
											touched.weight && errors.weight ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='CG'>
										Center of Gravity: The center of gravity for the entire
										aircraft
									</label>
									<Field
										value={values.name}
										id='cg'
										name='cg'
										type='number'
										placeholder="Enter Aircraft's CG"
										className={`form-control ${
											touched.cg && errors.cg ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Pitch'>
										Pitch Angle: The Aircraft's pitch angle on approach
									</label>
									<Field
										value={values.name}
										id='pitch'
										name='pitch'
										type='number'
										step='0.01'
										placeholder="Enter Aircraft's pitch angle"
										className={`form-control ${
											touched.pitch && errors.pitch ? "is-invalid" : ""
										}`}
									/>
									<br />
									<label htmlFor='Measurement Units'>
										Unit of measurement values are being entered in
									</label>
									<br />
									<Field
										as='select'
										id='unitsAir'
										name='unitsAir'
										type='select'
										value={values.unitsAir}
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
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default AddAircraft;
