import React, { Component } from "react";
import { Group, Circle } from "react-konva";

//----------------Approach Light Types Start----------------//
/**
 * ODALS (Needs checking)
 * MALSF (Done)
 * MALSR (Done) (Has running lights)
 * SSALF (Done)
 * SSALR (Done) (Has running lights)
 * ALSF-1 (Done)
 * ALSF-2 (Done)
 * RAIL (In Progress)
 * CALVERT (Needs Checking)
 * CLAVERT 2 (In Progress)
 * MALS
 * SALS
 * SSALS (Has running lights )
 */
//----------------Approach Light Types End------------------//

//----------------To be fixed and added later --------------//
// if(i=4) {
//     for (let k=-5; k <=10; k++) {
//         if (k < 1) {
//             items.push({
//                 x: (60 + (4*k)),
//                 y: (297 + (20 * 5)),
//                 id: "Special " + k.toString,
//             })
//         }
//         else if (k >=1 ) {
//             items.push({
//                 x: (85 + (4*k)),
//                 y: (297 + (20 * 5)),
//                 id: "Special " + k.toString,
//             })
//         }
//         else {
//             items.push({
//                 x: (106 + (4*k)),
//                 y: (297 + (20 * 5)),
//                 id: "Special " + k.toString,
//             })
//         }
//     }
// }
// else {
//------------------------End Section --------------------------------//

//------------------------Light Drawings------------------------------//
function generateODALS() {
	const items = [];
	// For two outisde threshold lights located 40ft on either side
	for (let j = 0; j < 2; j++) {
		if ((j = 0)) {
			items.push({
				x: 550,
				y: 210 - 9.16, // 210 should be changed to y value of top of runway width
				id: "ODThres" + j,
			});
		} else if ((j = 1)) {
			items.push({
				x: 550,
				y: 210 + 9.16, // 210 should be changed to y value of bottom of runway width
				id: "ODThres" + j,
			});
		}
	}
	//For all middle aligned lights
	for (let i = 0; i < 5; i++) {
		items.push({
			x: 550 + 68.7 * (i + 1), // First light needs to be drawn 300 ft behind threshold and each light is 300 ft spaced
			y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
			id: "ODCenter" + i,
		});
	}
}

function generateMALSF() {
	const items = [];
	//For all middle aligned lights
	for (let i = 0; i < 4; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 45.8 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		// For further spaced white light bars after row 5
	}
	for (let i = 0; i < 2; i++) {
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 779 + 45.8 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * t, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + "." + t + "l",
			});
		}
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 871.6 + 45.8 * (i + 1),
				y: 222,
			});
		}
	}
	return items;
}
function generateMALSFGreenLight() {
	const items = [];
	// For center forest green lights at row 5
	for (let t = 1; t <= 5; t++) {
		items.push({
			x: 650,
			y: 210 + 4 * t,
			id: t + "malsf",
		});
	}
	// For extra forest green lights above center at row 5
	for (let t = 1; t <= 8; t++) {
		items.push({
			x: 650,
			y: 140 + 4 * t,
			id: t + "malsfup",
		});
	}
	//For extra forest green lights below center at row 5
	for (let t = 1; t <= 8; t++) {
		items.push({
			x: 650,
			y: 268 + 4 * t,
			id: t + "malsfdown",
		});
	}
	return items;
}

function generateMALSR() {
	const items = [];
	//For all middle aligned lights
	for (let i = 0; i < 5; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 45.8 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		// For further spaced white light bars after row 5
		for (let t = 1; t <= 1; t++) {
			items.push({
				x: 779 + 45.8 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + "t",
			});
		}
	}
	// For extra white lights above center
	for (let t = 1; t <= 8; t++) {
		items.push({
			x: 650,
			y: 140 + 4 * t,
			id: t + "alt",
		});
	}
	//For extra white lights below center
	for (let t = 1; t <= 8; t++) {
		items.push({
			x: 650,
			y: 268 + 4 * t,
			id: t + "alt",
		});
	}
	return items;
}

function generateSSALF() {
	const items = [];
	for (let i = 0; i < 7; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 45.8 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		if (i === 4) {
			// Draw the extra running light next to the bars
			// Specifically at the 5th bar draw the two decision light bars on either side of the center light bar
			items.push({
				x: 781,
				y: 222,
				id: "SSALFrunner1",
			});
			// For extra white lights above center
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 779,
					y: 183 + 4 * t,
					id: "SSALFdecTop" + t,
				});
			}
			//For extra white lights below center
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 779,
					y: 239 + 4 * t,
					id: "SSALFdecBot" + t,
				});
			}
		}
		if (i > 4) {
			// Draw the extra running light next to the bars
			items.push({
				x: 553 + 45.8 * (i + 1),
				y: 222,
				id: "SSALFrunner1",
			});
		}
	}
	return items;
}

function generateSSALR() {
	const items = [];
	for (let i = 0; i < 7; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 40 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		if (i === 4) {
			// For extra white lights above center
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 779,
					y: 183 + 4 * t,
					id: "SSALRdecTop" + t,
				});
			}
			//For extra white lights below center
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 779,
					y: 239 + 4 * t,
					id: "SSALRdecBot" + t,
				});
			}
		}
	}
	for (let i = 7; i < 12; i++) {
		for (let j = 3; j <= 5; j++) {
			items.push({
				x: 550 + 40 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
	}
	return items;
}

function generateALSF1() {
	const items = [];
	// For main center white light bars up to 10 rows
	for (let i = 0; i < 10; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 570 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "ALSF-1-before:" + i + " _ " + j,
			});
		}
	}
	// For main center white light bars past row 10
	for (let i = 0; i < 10; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 799 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "ALSF-1-after:" + i,
			});
		}
	}
	// For single bright directional LEDS in between after row 10 light bars
	for (let i = 0; i < 10; i++) {
		for (let j = 1; j <= 1; j++) {
			items.push({
				x: 801 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "ALSF-1-after-single:" + i,
			});
		}
	}
	// The extra white lights at row 10
	for (let i = 1; i <= 8; i++) {
		items.push({
			x: 650,
			y: 132 + 4 * i,
			id: i + "r",
		});
	}
	for (let i = 1; i <= 8; i++) {
		items.push({
			x: 650,
			y: 280 + 4 * i,
			id: i + "r",
		});
	}
	return items;
}

function generateALSF1RedLights() {
	const items = [];
	for (let i = 0; i < 1; i++) {
		//Create repeated red lights per row lined up with the other white lights
		//for (let j=1; j <= 6; j++){
		// Middle red led bar on second row
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		// For extra red lights above first row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 11.45 * (i + 1),
				y: 140 + 4 * t,
				id: t + "alt",
			});
		}
		//For extra red lights below first row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 11.45 * (i + 1),
				y: 292 + 4 * t,
				id: t + "alt",
			});
		}
		//}
	}
	for (let i = 0; i < 1; i++) {
		//Create repeated red lights per row lined up with the other white lights
		//for (let j=1; j <= 6; j++){
		// For extra red lights above second row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 45.8 * (i + 1),
				y: 160 + 4 * t,
				id: t + "alt",
			});
		}
		//For extra red lights below second row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 45.8 * (i + 1),
				y: 272 + 4 * t,
				id: t + "alt",
			});
		}
		//}
	}
	return items;
}

function generateALSF2() {
	const items = [];
	// For main center white light bars up to 10 rows
	for (let i = 0; i < 10; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		if (i === 4) {
			// The extra lights at row 5
			for (let t = 1; t <= 3; t++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 182 + 4 * t,
					id: i + "r",
				});
			}
			for (let l = 1; l <= 3; l++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 250 + 4 * l,
					id: l + "r",
				});
			}
		}

		if (i === 9) {
			// The extra white lights at row 10
			for (let t = 1; t <= 8; t++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 132 + 4 * t,
					id: t + "r",
				});
			}
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 280 + 4 * l,
					id: l + "r",
				});
			}
		}
	}
	// For main center white light bars past row 10
	for (let i = 10; i < 20; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + "af2",
			});
		}
		// For single bright directional LEDS in between after row 10 light bars
		for (let t = 1; t <= 1; t++) {
			items.push({
				x: 553 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: t + "aft2",
			});
		}
	}
	return items;
}

function generateALSF2RedLights() {
	const items = [];
	for (let i = 0; i < 9; i++) {
		//Create repeated red lights per row lined up with the other white lights
		//for (let j=1; j <= 6; j++){
		// For extra red lights above center
		for (let t = 1; t <= 3; t++) {
			items.push({
				x: 550 + 22.9 * (i + 1),
				y: 140 + 4 * t,
				id: t + "alt",
			});
		}
		//For extra red lights below center
		for (let t = 1; t <= 3; t++) {
			items.push({
				x: 550 + 22.9 * (i + 1),
				y: 292 + 4 * t,
				id: t + "alt",
			});
		}
		//}
	}
	return items;
}

function generateRAIL() {
	const items = [];
	for (let i = 0; i < 1; i++) {
		//Create repeated red lights per row lined up with the other white lights
		//for (let j=1; j <= 6; j++){
		// Middle red led bar on second row
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		// For extra red lights above first row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 11.45 * (i + 1),
				y: 140 + 4 * t,
				id: t + "alt",
			});
		}
		//For extra red lights below first row
		for (let t = 1; t <= 5; t++) {
			items.push({
				x: 550 + 11.45 * (i + 1),
				y: 292 + 4 * t,
				id: t + "alt",
			});
		}
	}
	return items;
}

function generateCALVERT() {
	const items = [];
	// Currently need to ceck the spacing for the extra lights at the respective rows. The beginning y value needs to be changed for each row or the math needs to be flipped to work accordingly.
	// For main center white lights up to 10 rows
	for (let i = 0; i < 10; i++) {
		items.push({
			x: 550 + 22.54 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
			y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
			id: "CALVERT-single:" + i,
		});
		// Add the additional Lights on either side of Row 5
		if (i === 4) {
			for (let l = 1; l <= 4; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l, //minus makes it draw lights bottom to top
					id: l + "r",
				});
			}
			for (let l = 1; l <= 4; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
		// For Row 10
		if (i === 9) {
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * t,
					id: t + "r",
				});
			}
			for (let t = 1; t <= 5; t++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * t,
					id: t + "r",
				});
			}
		}
	}
	// For main center white light bars between rows 10 to 20 i.e. 2 lights light bars
	for (let i = 10; i < 20; i++) {
		for (let j = 1; j <= 2; j++) {
			items.push({
				x: 550 + 22.54 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 215.5 + 4.5 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "CALVERT-double:" + i,
			});
		}
		// For the additional lights on the sides of Row 15
		if (i === 14) {
			for (let l = 1; l <= 6; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l,
					id: l + "r",
				});
			}
			for (let l = 1; l <= 6; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
		// For Row 20
		if (i === 19) {
			for (let l = 1; l <= 7; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l,
					id: l + "r",
				});
			}
			for (let l = 1; l <= 7; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
	}
	// For center lights past row 20 i.e. 3 lights light-bar
	for (let i = 20; i < 30; i++) {
		for (let j = 1; j <= 3; j++) {
			items.push({
				x: 550 + 22.54 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 214 + 4.5 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "CALVERT-triple" + i,
			});
		}
		// For the additional lights on the sides of Row 25
		if (i === 24) {
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l,
					id: l + "r",
				});
			}
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
	}
	// The extra white lights on either side of Rows: 5, 10, 15, 20, 25

	return items;
}

function generateCALVERT2() {
	const items = [];
	// This section is for the front half of the lighting system that is the same as ALSF2
	// For main center white light bars up to 10 rows
	for (let i = 0; i < 10; i++) {
		for (let j = 1; j <= 5; j++) {
			items.push({
				x: 550 + 22.9 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 210 + 4 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: i + " , " + j,
			});
		}
		if (i === 4) {
			// The extra lights at row 5
			for (let t = 1; t <= 3; t++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 182 + 4 * t,
					id: i + "r",
				});
			}
			for (let l = 1; l <= 3; l++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 250 + 4 * l,
					id: l + "r",
				});
			}
		}

		if (i === 9) {
			// The extra white lights at row 10
			for (let t = 1; t <= 8; t++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 132 + 4 * t,
					id: t + "r",
				});
			}
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.9 * (i + 1),
					y: 280 + 4 * l,
					id: l + "r",
				});
			}
		}
	}

	//------- This section is for the second half of the approach lighting that is the same as CALVERT1

	for (let i = 10; i < 20; i++) {
		items.push({
			x: 550 + 22.54 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
			y: 222, //(297 + (20 * (i+1))), // Needed to change to the next row down.
			id: "CALVERT-single:" + i,
		});
		// Add the additional Lights on either side of Row 15
		if (i === 14) {
			for (let l = 1; l <= 6; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l, //minus makes it draw lights bottom to top
					id: l + "r",
				});
			}
			for (let l = 1; l <= 6; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
		// For Row 20
		if (i === 19) {
			for (let t = 1; t <= 7; t++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * t,
					id: t + "r",
				});
			}
			for (let t = 1; t <= 7; t++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * t,
					id: t + "r",
				});
			}
		}
	}
	// For main center white light bars between rows 10 to 20 i.e. 2 lights light bars
	for (let i = 20; i < 25; i++) {
		for (let j = 1; j <= 2; j++) {
			items.push({
				x: 550 + 22.54 * (i + 1), //(85 + (4*j)), //needs to loop to draw series of lights from left to right on each row
				y: 215.5 + 4.5 * j, //(297 + (20 * (i+1))), // Needed to change to the next row down.
				id: "CALVERT-double:" + i,
			});
		}
		// For the additional lights on the sides of Row 15
		if (i === 24) {
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 212 - 4 * l,
					id: l + "r",
				});
			}
			for (let l = 1; l <= 8; l++) {
				items.push({
					x: 550 + 22.54 * (i + 1),
					y: 232 + 4 * l,
					id: l + "r",
				});
			}
		}
	}

	return items;
}

function generateCALVERT2RedLights() {
	const items = [];
	for (let i = 0; i < 9; i++) {
		//Create repeated red lights per row lined up with the other white lights
		//for (let j=1; j <= 6; j++){
		// For extra red lights above center
		for (let t = 1; t <= 3; t++) {
			items.push({
				x: 550 + 22.9 * (i + 1),
				y: 140 + 4 * t,
				id: t + "alt",
			});
		}
		//For extra red lights below center
		for (let t = 1; t <= 3; t++) {
			items.push({
				x: 550 + 22.9 * (i + 1),
				y: 292 + 4 * t,
				id: t + "alt",
			});
		}
		//}
	}
	return items;
}
//---------------------------End Section------------------------------//

//---------------------------Light Classes----------------------------//

class MALSR extends Component {
	state = {
		items: generateMALSR(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}

class MALSF extends Component {
	state = {
		items: generateMALSF(),
		greenitems: generateMALSFGreenLight(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
				{this.state.greenitems.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='forestgreen'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}
class SSALR extends Component {
	state = {
		items: generateSSALR(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='red'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}
class SSALF extends Component {
	state = {
		items: generateSSALF(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='blue'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}
class ALSF1 extends Component {
	state = {
		items: generateALSF1(),
		reditems: generateALSF1RedLights(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
				{this.state.reditems.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='red'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}
class ALSF2 extends Component {
	state = {
		items: generateALSF2(),
		reditems: generateALSF2RedLights(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
				{this.state.reditems.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='red'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}

class CALVERT extends Component {
	state = {
		items: generateCALVERT(),
		//reditems: generateALSF2RedLights(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
				{/* {this.state.reditems.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='red'
						radius={1}
						shadowBlur={3}
					/>
				))} */}
			</Group>
		);
	}
}

class CALVERT2 extends Component {
	state = {
		items: generateCALVERT2(),
		reditems: generateCALVERT2RedLights(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
				{this.state.reditems.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='red'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}

class RAIL extends Component {
	state = {
		items: generateRAIL(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}

class ODALS extends Component {
	state = {
		items: generateODALS(),
	};
	render() {
		return (
			<Group>
				{this.state.items.map((item) => (
					<Circle
						key={item.id}
						x={item.x}
						y={item.y}
						fill='white'
						radius={1}
						shadowBlur={3}
					/>
				))}
			</Group>
		);
	}
}

export {
	MALSR,
	MALSF,
	SSALR,
	SSALF,
	ALSF1,
	ALSF2,
	CALVERT,
	CALVERT2,
	ODALS,
	RAIL,
};
