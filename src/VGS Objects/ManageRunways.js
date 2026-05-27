import React, { Component } from "react";
import firestore from "../Firestore";
import {
	collection,
	doc,
	query,
	where,
	getDocs,
	getDoc,
} from "firebase/firestore";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import EditRunway from "../components/TableComponents/EditRunway";
import AddRunway from "../components/TableComponents/AddRunway";
import {
	Button,
	ButtonToolbar,
	Container,
	Col,
	Modal,
	Row,
} from "react-bootstrap";

export class ManageRunways extends Component {
	constructor(props) {
		super(props);
		this.gotData = this.gotData.bind(this);
		this.select = [];
		this.state = {
			runways: [],
			select: "",
			approachlights: "",
			name: "",
			icao: "",
			dh: "",
			edgespacing: "",
			gsx: "",
			gsy: "",
			glideslope: "",
			tch: "",
			width: "",
			units: "",
			showAdd: false,
			showEdit: false,
			rerender: false,
			itemSelected: false,
		};
	}

	componentDidMount = () => {
		this.gotData();
	};

	async gotData() {
		// gotData = async () => {
		const querySnapshot = await getDocs(collection(firestore, "Runways"));
		const runways = [];
		querySnapshot
			.forEach((doc) => {
				runways.push({
					name: doc.id,
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
				this.setState({ runways });
			})
			?.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}

	async childFunction() {
		let selection = [this.state.select];

		console.log("Inside Runway ChildFunction: ", selection);

		const docName = selection[0];
		console.log("Runway Doc Name: ", docName);
		const docRef = doc(firestore, "Runways", docName);
		console.log("docRef was found as: ", docRef);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			this.setState(
				{
					approachlights: String(docSnap.data().ApproachLights),
					name: docSnap.id,
					icao: docSnap.data().ICAO,
					dh: docSnap.data().DH,
					edgespacing: docSnap.data().EdgeSpacing,
					gsx: docSnap.data().GSOffsetX,
					gsy: docSnap.data().GSOffsetY,
					glideslope: docSnap.data().GlideSlope,
					tch: docSnap.data().TCH,
					width: docSnap.data().Width,
					units: docSnap.data().Units,
				},
				() => {
					this.props.parentRunFunction(
						selection,
						this.state.approachlights,
						this.state.name,
						this.state.icao,
						this.state.dh,
						this.state.edgespacing,
						this.state.gsx,
						this.state.gsy,
						this.state.glideslope,
						this.state.tch,
						this.state.width,
						this.state.units
					);
				}
			);
		} else {
			console.log("We could not find a Runway document in the childfunction");
		}

		// if(data.data().Units == true) {
		// 	//Check if Decsion Height is 100 because it is probably set in feet
		// 	let dhI = (data.data().DH) * 3.281
		// 	let edgeI = (data.data().EdgeSpacing) * 3.281
		// 	let gsxI = (data.data().GSOffsetX) * 3.281
		// 	let gsyI = (data.data().GSOffsetY) * 3.281
		// 	let TCH = (data.data().TCH) * 3.281
		// 	let widthI = (data.data().Width) * 3.281

		// 	this.setState({
		// 		approachlights: String(data.data().ApproachLights),
		// 		name: data.id,
		// 		icao: data.data().ICAO,
		// 		dh: dhI,
		// 		edgespacing: edgeI,
		// 		gsx: gsxI,
		// 		gsy: gsyI,
		// 		glideslope: data.data().GlideSlope,
		// 		tch: TCH,
		// 		width: widthI,
		// 		units: false,
		// 	});
		// } else {
		//console.log("Runway values already in Imperial")
		// let dhMF
		// if (data.data().DH == 100) {
		// 	dhMF = (data.data().DH) * 3.281
		// }
	}

	showModal = () => {
		this.setState({
			show: !this.state.show,
		});
	};

	closeModal = () => {
		this.setState({
			show: !this.state.show,
		});
		this.handleUpdate();
	};

	handleOnSelect = (row, isSelect, rowIndex) => {
		this.childFunction = this.childFunction.bind(this);
		//setTimeout(() => {
		if (isSelect) {
			// const run = this.node.selectionContext.selected;
			// console.log(run);
			this.setState(() => ({
				select: row.name,
				selected: [row.name],
			}));
		} else {
			this.setState(() => ({
				selected: this.state.selected.filter((x) => x !== row.id),
			}));
		}
		this.setState(() => ({
			//select: this.node.selectionContext.selected,
		}));
		this.setState({ itemSelected: true });
		//});
		console.log(this.state.select);
		setTimeout(() => {
			this.childFunction();
		});
	};

	// find selected row key and delete that aircraft from database
	delRunway = () => {
		alert(this.node.selectionContext.selected);
		const selections = [this.node.selectionContext.selected];
		const db = firestore.collection("Runways");

		selections.forEach((key) => {
			db.doc(key.toString())
				.delete()
				.then(function () {
					console.log("Deletion successful!");
				})
				.catch(function (error) {
					console.error("Something went wrong, document not removed");
				});
		});
	};

	// editAircraft = () => {
	//   // find selected row key and take user input to .set aircraft values for database
	//   console.log(this.state.show);
	// };

	render() {
		let closeAdd = () => this.setState({ showAdd: false });
		let closeEdit = () => this.setState({ showEdit: false });
		const runSelect = this.state.select;
		const selectRowProp = {
			mode: "radio",
			bgColor: "lightblue",
			clickToEdit: false,
			clickToSelect: true, //enable click to select
			hideSelectColumn: true,
			//selected: [],
			onSelect: this.handleOnSelect,
		};

		const columns = [
			{
				dataField: "name",
				text: "Runway Name",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "icao",
				text: "ICAO",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "approachlights",
				text: "Approach Lights type",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "dh",
				text: "Runway Decision Height",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "edgespacing",
				text: "Runway Edge Light Spacing",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "gsx",
				text: "GSOffsetX",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "gsy",
				text: "GSOffsetY",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "glideslope",
				text: "Glide Slope Angle",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "tch",
				text: "Runway TCH",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "width",
				text: "Runway Width",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
			{
				dataField: "units",
				text: "Metric?",
				headerStyle: {
					backgroundColor: "#003E6A",
					color: "#FFFFFF",
				},
			},
		];

		return (
			<div style={{ padding: 25 }}>
				<h1 align='center'>Runway Table</h1>
				<BootstrapTable
					bootstrap4
					ref={(n) => (this.node = n)}
					id='runTable'
					keyField='name'
					data={this.state.runways}
					columns={columns}
					selectRow={selectRowProp}
					cellEdit={cellEditFactory({ mode: "click" })}
					headerClasses='header-class'
				/>

				<ButtonToolbar style={{ display: "flex" }}>
					<Container>
						<Row>
							<Col sm align='left'>
								<Button
									variant='primary'
									size='lg'
									onClick={() => this.setState({ showAdd: true })}
								>
									Add Runway
								</Button>
							</Col>
							<Col sm align='center'>
								<Button
									variant='success'
									size='lg'
									onClick={() => this.setState({ showEdit: true })}
									disabled={!this.state.itemSelected}
								>
									Edit Runway
								</Button>
							</Col>
							<Col sm align='right'>
								<Button variant='danger' size='lg' onClick={this.delRunway}>
									Delete Runway
								</Button>
							</Col>
						</Row>
					</Container>
				</ButtonToolbar>

				<Modal id='addRunModal' show={this.state.showAdd} onHide={closeAdd}>
					<Modal.Header closeButton>
						<Modal.Title>Add Runway</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<AddRunway id='runForm' toggle={closeAdd} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={closeAdd}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal id='editRunModal' show={this.state.showEdit} onHide={closeEdit}>
					<Modal.Header closeButton>
						<Modal.Title>Runway Editor</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<EditRunway
							name={runSelect}
							toggle={closeEdit}
							render={this.gotData}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={closeEdit}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
export default ManageRunways;
