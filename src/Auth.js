import React, { Component, createContext } from "react";
import { generateUserDocument } from "./Firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({ user: null });
const auth = getAuth();

class UserProvider extends Component {
	state = {
		user: null,
	};

	componentDidMount = () => {
		// onAuthStateChanged(auth, (userAuth) => {
		// 	if (userAuth) {
		// 		const user = generateUserDocument(userAuth);
		// 		this.setState({ user: user });
		// 	}
		// });
	};
	render() {
		return (
			<AuthContext.Provider value={this.state.user}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default UserProvider;
