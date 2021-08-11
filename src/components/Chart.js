import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Hammer from "hammerjs";
import * as Zoom from "chartjs-plugin-zoom";


export class Chart extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			labels : props.labels,
			data1: props.datasets[0].data
		}
	}


	componentDidMount = () => {
		console.log(this.props.data)
		this.setState({
			england: {
				data: this.props.datasets[0].data
			}
		})
	}
	
	
	render() {
		return (
			<div>
				{this.labels}
				{this.data1}
			</div>
		)
	}
}

export default Chart
