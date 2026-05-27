import React, { Component } from "react";
import { Group, Circle, Rect } from "react-konva";

//All bar "widths" should be adjusted as a ratio to fill hard coded runway width being drawn
// Top bar should start at 135 and the last bar should not go past 310
// Bars have a 180 px working range, starts at 135, half way point is at 90 of 180 range, subtract 5.75 ft of center gap
// Above and below works within range of 135 to 187 and 205.75 to 257.75 for above and below respectively
// Above and below center bars have a working range of 52 px. Center points are calculated using 85/2 = 42.5
// For 4 bars: Center points are 152.5 for above and 248.25 for below
// For 6 bars:
// For 8 bars:
// For 12 bars:
// For 16 bars: 10.625 spacing (includes bar and gap)
function generateSixty() {
	const items = [];
	//Logic for drawing
	for (let t = 0; t < 4; t++) {
		if (t < 2) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 180.5 - 17.5 * t, // Starts top of bars 10ft from the edge of runway (located at 135) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		} else if (t >= 2) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 205.75 + 17.5 * t, // Starts top of bars below centerline (first bar located at 149) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		}
	}
	return items;
}

function generateSeventyFive() {
	const items = [];
	//Logic for drawing
	for (let t = 0; t < 6; t++) {
		if (t < 3) {
			items.push({
				x: 510, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 180.5 - 14 * t, // Starts top of bars 10ft from the edge of runway (located at 135) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		} else if (t >= 3) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 205.75 + 14 * t, // Starts top of bars below centerline (first bar located at 149) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		}
	}
	return items;
}

function generateOneHund() {
	const items = [];
	//Logic for drawing
	for (let t = 0; t < 8; t++) {
		if (t < 4) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 180.5 - 11.5 * t, // Starts top of bars 10ft from the edge of runway (located at 135) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		} else if (t >= 4) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 205.75 + 11.5 * t, // Starts top of bars below centerline (first bar located at 149) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		}
	}
	return items;
}

function generateOneFifty() {
	const items = [];
	//Logic for drawing
	for (let t = 0; t < 12; t++) {
		if (t < 6) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 180.5 - 9.5 * t, // Starts top of bars 10ft from the edge of runway (located at 135) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		} else if (t >= 6) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 205.75 + 9.5 * t, // Starts top of bars below centerline (first bar located at 149) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		}
	}
	return items;
}

function generateTwoHund() {
	const items = [];
	//Logic for drawing
	for (let t = 0; t < 16; t++) {
		if (t < 8) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 180.5 - 6.5 * t, // Starts top of bars 10ft from the edge of runway (located at 135) and moves it down according to the stripe width plus gap between stripes). Original multiplier 3.5 changed to 6.5
				id: t + "t",
			});
		} else if (t >= 8) {
			items.push({
				x: 510.5, // Starts right of bars "20ft or 4.50px" left of end of runway
				y: 205.75 + 6.5 * t, // Starts top of bars below centerline (first bar located at 205.75) and moves it down according to the stripe width plus gap between stripes)
				id: t + "t",
			});
		}
	}
	return items;
}

class Sixty extends Component {
	state = {
		items: generateSixty(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Rect
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						width='34.35'
						height='9.31'
						shadowBlur={1}
					/>
				))}
			</Group>
		);
	}
}

class SeventyFive extends Component {
	state = {
		items: generateSeventyFive(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Rect
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						width='34.35'
						height='8.31'
						shadowBlur={1}
					/>
				))}
			</Group>
		);
	}
}

class OneHund extends Component {
	state = {
		items: generateOneHund(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Rect
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						width='34.35'
						height='6.31'
						shadowBlur={1}
					/>
				))}
			</Group>
		);
	}
}

class OneFifty extends Component {
	state = {
		items: generateOneFifty(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Rect
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						width='34.35'
						height='5.31'
						shadowBlur={1}
					/>
				))}
			</Group>
		);
	}
}

class TwoHund extends Component {
	state = {
		items: generateTwoHund(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Rect
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						width='34.35' // Original pixel ratio value is 34.35. 34.35 * 5.44 to scale up
						height='4.125' // original pixel ratio value is 1.31. 4.125/1.31
						shadowBlur={1}
					/>
				))}
			</Group>
		);
	}
}

export { Sixty, SeventyFive, OneHund, OneFifty, TwoHund };
