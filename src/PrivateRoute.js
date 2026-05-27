import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import Dashboard from "./Dashboard";
import firebaseapp from "./Firestore";

// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
// 	const { currentUser } = useContext(AuthContext);
// 	return (
// 		<Route
// 			{...rest}
// 			render={(routeProps) =>
// 				!!currentUser ? (
// 					<RouteComponent {...routeProps} />
// 				) : (
// 					<Navigate to={"/Login"} />
// 				)
// 			}
// 		/>
// 	);
// };

export default function PrivateRoute(props) {
	const authValue = useContext(AuthContext);

	if (authValue.userDataPresent) {
		if (authValue.user == null) {
			return <Navigate to={props.NavigateTo}></Navigate>;
		} else {
			return (
				<Route exact path={props.path}>
					<Dashboard /> {/* {props.children} */}
				</Route>
			);
		}
	} else {
		return null;
	}
}

// const PrivateRoute = () => {
// 	return firebaseapp.auth().onAuthStateChanged((user) => {
// 		if (user) {
// 			return <Dashboard />;
// 		} else {
// 			return <Navigate to='/Login' />;
// 		}
// 	});
// };

// export default PrivateRoute;
