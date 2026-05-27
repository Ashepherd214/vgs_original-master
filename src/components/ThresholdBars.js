import React from "react";
import {
	Sixty,
	SeventyFive,
	OneHund,
	OneFifty,
	TwoHund,
} from "../components/ThresholdBarsDraw";

function ThresholdBars(props) {
	console.log(props);
	console.log("Runway width prop detected: " + props.runwidth);
	const width = props.runwidth;
	//Should accept props coming from Runways table to determine which lights to show on the outputs tab.
	//Based on incoming props, should call out to RunwayLights.js and render the respective component
	// switch (props.approachlights) {
	// 	case "ODALS":
	// 		return <ODALS />;
	// 	case "RAIL":
	// 		return <RAIL />;
	// 	case "MALSR":
	// 		return <MALSR />;
	// 	case "MALSF":
	// 		return <MALSF />;
	// 	case "SSALR":
	// 		return <SSALR />;
	// }
	if (width <= 60) {
		return <Sixty />;
	} else if (width > 60 && width < 75) {
		return <SeventyFive />;
	} else if (width >= 75 && width < 100) {
		return <OneHund />;
	} else if (width >= 100 && width < 150) {
		return <OneFifty />;
	} else if (width >= 150) {
		return <TwoHund />;
	}
}

export { ThresholdBars };
