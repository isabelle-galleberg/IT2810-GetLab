import React from "react";
import "./App.css";
import { LayoutProps } from "./types/propTypes";

function App(props: LayoutProps) {
	return (
		<div className="container">
			<header>
				<img className="getLabLogo" src={require("./assets/logo.png")} alt="" />
				<h1>Get your GitLab data with GetLab!</h1>
			</header>
			<main></main>
			<footer>
				<p>
					Created with <span className="heart">&hearts;</span> by Ole, Axel, Eva
					and Isabelle
				</p>
			</footer>
		</div>
	);
}

export default App;
