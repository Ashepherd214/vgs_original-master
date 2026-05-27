import React, { Component } from 'react'
import {
	Group,
	Line
} from 'react-konva'

// class GroundSegmentRender extends Component {
// 	constructor(props) {
// 		super(props)

// 		// this.state={
// 		// 	xahead: this.props.xahead,
// 		// 	xbeyond: this.props.xbeyond
// 		// }
// 		//console.log("Graound Segment Render's props are: " + props)
// 		console.log("XAhead in the GS Render Component before conversion is: " + this.props.xahead)
// 		console.log("XBeyond in the GS Render Component before conversion is: " + this.props.xbeyond)
// 		let Xahead = Number(550 - (this.props.xahead*0.229))
// 		let Xbeyond = Number(550 - (this.props.xbeyond*0.229))
		
// 		console.log("XAhead in the GS Render Component is: " + Xahead)
// 		console.log("XBeyond in the GS Render Component is: " + Xbeyond)
// 	}
// 	render() {
		
// 		return(
// 			<Group>
// 				<Line
// 					points={[Xahead, 100, Xahead, 250, Xahead, 350]}
// 					closed
// 					stroke="yellow"
// 				/>
// 				<Line 
// 					points={[Xbeyond, 100, Xbeyond, 250, Xbeyond, 350]}
// 					closed
// 					stroke="yellow"
// 				/>
// 			</Group>
// 		)
// 	}
// }

const GroundSegmentRender = (props) => {
	console.log("Ground Segment Render's props are: " + props)
	console.log("XAhead in the GS Render Component before conversion is: " + props.xahead)
	console.log("XBeyond in the GS Render Component before conversion is: " + props.xbeyond)

	//originally xahead was subtraction but changed to addition to push line behind threshold in pixel format.
	//Because of this the multiplier may need to be changed as well to scale the behind threshold spacing to be smaller.
	let Xahead = Number(550 + (props.xahead*0.229)) 
	let Xbeyond = Number(550 - (props.xbeyond*0.229))
		
	console.log("XAhead in the GS Render Component is: " + Xahead)
	console.log("XBeyond in the GS Render Component is: " + Xbeyond)
	return	<Group>
				<Line
					points={[Xahead, 100, Xahead, 250, Xahead, 350]}
					closed
					stroke="yellow"
				/>
				<Line 
					points={[Xbeyond, 100, Xbeyond, 250, Xbeyond, 350]}
					closed
					stroke="yellow"
				/>
			</Group>
		
}

export default GroundSegmentRender