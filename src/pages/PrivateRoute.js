import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children }) => {
	const { user } = useAuth0();
	console.log(children);
	if (user) return children;
	return <Navigate to="/" />;
};
export default PrivateRoute;
