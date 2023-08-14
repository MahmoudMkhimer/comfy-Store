import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import styled from "styled-components";
import {
	Home,
	About,
	SinglProduct,
	Private,
	Products,
	Cart,
	CheckOut,
	Error,
	AuthWrapper,
} from "./pages/index";

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar></Navbar>
				<Sidebar></Sidebar>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/about" element={<About />} />
					<Route exact path="/cart" element={<Cart />} />

					<Route exact path="/products" element={<Products />} />

					<Route
						exact
						path="/products/:id"
						element={<SinglProduct />}
					/>
					<Route
						exact
						path="/checkOut"
						element={
							<Private>
								<CheckOut />
							</Private>
						}
					/>

					<Route path="*" element={<Error />} />
				</Routes>
				<Footer></Footer>
			</Router>
		</AuthWrapper>
	);
}

export default App;
