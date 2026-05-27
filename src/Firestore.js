//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
	doc,
	getFirestore,
	collection,
	query,
	where,
	getDoc,
	getDocs,
	setDoc,
} from "firebase/firestore";
import {
	getAuth,
	onAuthStateChanged,
	OAuthProvider,
	signInWithPopup,
	setPersistence,
	browserSessionPersistence,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import React from "react";
import { Navigate } from "react-router-dom";
//import { OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBbeV0UBT98Q_2XT9H_XLhNV7bG72kJnq4",
	authDomain: "rsi-vgs.firebaseapp.com",
	databaseURL: "https://rsi-vgs.firebaseio.com",
	projectId: "rsi-vgs",
	storageBucket: "rsi-vgs.appspot.com",
	messagingSenderId: "294305445462",
	appId: "1:294305445462:web:fafc6a1df04bdc7b38adf7",
	measurementId: "G-J8ZDDB5LGS",
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
//firebase.analytics();
const analytics = getAnalytics(firebaseApp);

// Firestore v8
//const firestore = firebase.firestore();
//export const auth = firebase.auth();

// Firestore v9
const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

//----------- Begin Azure AD login authentication ----------------//

export const handleWindowsLogin = () => {
	const provider = new OAuthProvider("microsoft.com");

	provider.setCustomParameters({
		logi_hint: "user@rsi-visuals.com",
		tenant: "bd0aab2b-3a48-43cf-afc5-8eb63fc1c519",
	});

	// To sign in by Navigateing to the sign in page:
	// auth.signInWithNavigate(provider)

	// To sign in with a popup window for the sign in page:
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = OAuthProvider.credentialFromResult(result);
			const accessToken = credential.accessToken;
			const idToken = credential.idToken;
			return <Navigate to='/Dashboard' />;
		})
		.catch((error) => {
			console.log("Problem logging in: ", error.message);
		});
};
// -----------End Azure Authentication ---------------------------//

// [START initialize_persistence]
/* setPersistence(auth, browserSessionPersistence)
	.then(() => {
		const provider = new OAuthProvider("microsoft.com");

		provider.setCustomParameters({
			logi_hint: "user@rsi-visuals.com",
			tenant: "bd0aab2b-3a48-43cf-afc5-8eb63fc1c519",
		});
		return signInWithPopup(auth, provider);
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
	}); */

// firebase
// 	.firestore()
// 	.enablePersistence()
// 	.catch((err) => {
// 		if (err.code == "failed-precondition") {
// 			// Multiple tabs open, persistence can only be enabled
// 			// in one tab at a a time.
// 			// ...
// 		} else if (err.code == "unimplemented") {
// 			// The current browser does not support all of the
// 			// features required to enable persistence
// 			// ...
// 		}
// 	});
// Subsequent queries will use persistence, if it was enabled successfully
// [END initialize_persistence]

export const generateUserDocument = (
	user,
	useID,
	firstName,
	lastName,
	email
) => {
	if (!useID) {
		return null;
	} else {
		console.log("on generation auth ID is " + useID);
		console.log("on generation first name is " + firstName);
		console.log("on generation last name is " + lastName);
		console.log("on generation email is " + email);
		//return;

		/*		
	} else {
	

	let first = firstName
	let last = lastName
	let mail = email
	}
	if (!user.uid) {
		// const { email, firstName, lastName } = user;
		console.log(
			"Info for generating user doc: " +
				firstName +
				" " +
				lastName +
				" " +
				email
		);
		try {
			//needs to change to a form os firestore.collection("users").add({data})
			userRef.set({
				firstName: firstName,
				lastName: lastName,
				email: email,
			});
		} catch (error) {
			console.error("Error creating user document", error);
		}
	}
*/
		//console.log("User ID is: " + `${user.uid}`);
		//const userRef = firestore.collection("users").doc(String(useID)); //Needs a specific uid to actually get any snapshot info

		// Query UserID v9
		const userRef = query(
			collection(firestore, "users"),
			where(`${String(useID)}`, "==", true)
		); //Needs a specific uid to actually get any snapshot info
		//const userRef = firestore.collection("users").doc(String(user.uid)); //Needs a specific uid to actually get any snapshot info
		//const snapshot = userRef.get();
		//console.log("User found: " + userRef);
		//if (!snapshot.exists) {
		//const { email, firstName, lastName } = user;
		console.log(
			"Info for generating user doc: " +
				useID +
				" " +
				firstName +
				" " +
				lastName +
				" " +
				email
		);
		try {
			//needs to change to a form os firestore.collection("users").add({data})
			/*await*/ setDoc(doc(userRef), {
				firstName: firstName,
				lastName: lastName,
				email: email,
			});
			// userRef.set({
			// 	firstName: firstName,
			// 	lastName: lastName,
			// 	email: email,
			// });
		} catch (error) {
			console.error("Error creating user document", error);
		}
		//}
		return;
	}
};

const getUserDocument = async (uid) => {
	if (!uid) {
		return null;
	}
	try {
		const userRef = doc(firestore, "users", `${uid}`);
		const userDocument = await getDoc(userRef);
		return {
			uid: uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error("Error fetching user", error);
	}
};

export default firestore;
