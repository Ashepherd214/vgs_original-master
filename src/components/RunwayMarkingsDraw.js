import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Stage, Layer, Group, Rect, Circle } from "react-konva";

function generateUpperMarkings(props) {
	console.log(props);
	const edgeLights = props.edgespacing;
	console.log(
		"Edge Light spacing in runway marking draw: " + edgeLights + "ft"
	);
	const upperEdge = [];
	for (let t = 1; t <= 12; t++) {
		upperEdge.push({
			x: 550 - edgeLights * 0.229 * t,
			y: 120,
			id: "ue" + t,
		});
	}
	return upperEdge;
}

function generateLowerMarkings(props) {
	const edgeLights = props.edgespacing;
	const lowerEdge = [];
	for (let t = 1; t <= 12; t++) {
		lowerEdge.push({
			x: 550 - edgeLights * 0.229 * t,
			y: 320,
			id: "le" + t,
		});
	}
	return lowerEdge;
}

class RunwayMarkingsDraw extends Component {
	constructor(props) {
		super(props);

		this.state = {
			upperEdgeLights: generateUpperMarkings(props),
			lowerEdgeLights: generateLowerMarkings(props),
		};
	}
	render() {
		return (
			<Group>
				{this.state.upperEdgeLights.map((upperEdge) => (
					<Circle
						key={upperEdge.id}
						x={upperEdge.x}
						y={upperEdge.y}
						fill='white'
						radius={3}
						shadowBlur={5}
					/>
				))}
				{this.state.lowerEdgeLights.map((lowerEdge) => (
					<Circle
						key={lowerEdge.id}
						x={lowerEdge.x}
						y={lowerEdge.y}
						fill='white'
						radius={3}
						shadowBlur={5}
					/>
				))}
			</Group>
		);
	}
}

export { RunwayMarkingsDraw };
