import React, { Component } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Chart from './Chart'

let england = 'https://api.coronavirus.data.gov.uk/v1/data?' +
`filters=areaType=nation;areaName=england&` +
'structure={"date":"date","newCases":"newCasesByPublishDate", "newDeaths":"newDeaths28DaysByPublishDate"}'


let wales = 'https://api.coronavirus.data.gov.uk/v1/data?' +
`filters=areaType=nation;areaName=wales&` +
'structure={"newCases":"newCasesByPublishDate", "newDeaths":"newDeaths28DaysByPublishDate"}'


let scotland = 'https://api.coronavirus.data.gov.uk/v1/data?' +
`filters=areaType=nation;areaName=scotland&` +
'structure={"newCases":"newCasesByPublishDate", "newDeaths":"newDeaths28DaysByPublishDate"}'

let dates = 'https://api.coronavirus.data.gov.uk/v1/data?%27%27filters=areaType=nation;areaName=england&%27%27structure={%22date%22:%22date%22}'

export class PlotData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            englandData: '',
            walesData: '',
            scotlandData: '',
            datesData: ''

        }
    }

    componentDidMount = () => {

    axios.get(england).then(res => {
            this.setState({
                englandData : res.data.data,
                datesData: res.data.data.map(obj => obj.date)
            })
        })
        .catch(err => {
            console.log(err)
        })
    axios.get(wales).then(res => {
            this.setState({
                walesData: res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    axios.get(scotland).then(res => {
            this.setState({
                scotlandData: res.data.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        window.state = this.state
        return (
            <div>
                <Chart />
            </div>
        )
    }
}

export default PlotData