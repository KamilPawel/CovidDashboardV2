import React, { Component } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Circle from './Circle';

import ReactMapGL, { Marker } from 'react-map-gl';
// Implementing the chart 

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';


const correctCoortdinates = (x, y) => {
    return [x + 0.5, y - 5.5]
}

const [x, y] = [53.581794, -4.562387]

const [eX, eY] = correctCoortdinates(52.3555, 1.1743)
const [wX, wY] = correctCoortdinates(52.1307, 3.7837)
const [sX, sY] = correctCoortdinates(56.4907, 5 - 4.2026)



const correctDate = (dateStr) => {
    let newString = dateStr.slice(2)
    newString = newString.split('-')
    let finalString = newString[newString.length - 1]
    for (let i = newString.length - 2; i >= 0; i--) {
        finalString +=  '/' + newString[i]
    }
    return finalString
}


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
            englandData: {
                cases: '',
                deaths: ''
            },
            walesData: {
                cases: '',
                deaths: ''
            },
            scotlandData: {
                cases: '',
                deaths: ''
            },
            datesData: '',
            ukData: {
                cases: '',
                deaths: ''
            },
            viewport: {
                width: '30vw',
                height: '80vh',
                latitude: x,
                longitude: y,
                zoom: 4
            }

        }
    }

    componentDidMount = () => {

    axios.get(england).then(res => {
            const [casesE, deathsE] = [res.data.data.map(obj => obj.newCases), res.data.data.map(obj => obj.newDeaths)]
            this.setState({
                englandData : {
                    cases: casesE.reverse(),
                    deaths: deathsE.reverse()
                },
                datesData: (res.data.data.map(obj => correctDate(obj.date))).reverse()
            })
        })
        .catch(err => {
            console.log(err)
        })
    axios.get(wales).then(res => {
            const [casesE, deathsE] = [res.data.data.map((obj, i) => obj.newCases), res.data.data.map(obj => obj.newDeaths)]
            this.setState({
                walesData: {
                    cases: casesE.reverse(),
                    deaths: deathsE.reverse()
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    axios.get(scotland).then(res => {
            const [casesE, deathsE] = [res.data.data.map(obj => obj.newCases), res.data.data.map(obj => obj.newDeaths)]
            
            this.setState({
                scotlandData: {
                    cases: casesE.reverse(),
                    deaths: deathsE.reverse()
                }
            })
            let casesA = []
            let deathA = []
            for (let i = 0; i < this.state.englandData.cases.length; i++)
            {
                casesA.push(this.state.englandData.cases[i] + this.state.walesData.cases[i] + this.state.scotlandData.cases[i])
                deathA.push(this.state.englandData.deaths[i] + this.state.walesData.deaths[i] + this.state.scotlandData.deaths[i])
            }
            this.setState({
                ukData : {
                    cases: casesA,
                    deaths: deathA
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    
    // Cleaning up data

  }
  
  render() {
    window.state = this.state
    const countriesCases = [this.state.englandData.cases, this.state.walesData.cases, this.state.scotlandData.cases]
    const countriesDeaths = [this.state.englandData.deaths, this.state.walesData.deaths, this.state.scotlandData.deaths]
    for (let i = 0; i < countriesCases.length; i++) {
      for (let j = 0; j < countriesCases[i].length; j++) {
        if (countriesCases[i][j] === 0) countriesCases[i][j] = countriesCases[i][j - 1]
      }
    }

    for (let i = 0; i < countriesDeaths.length; i++) {
      for (let j = 0; j < countriesDeaths[i].length; j++) {
        if (countriesCases[i][j] === 0 || countriesCases[i][j] === null) countriesDeaths[i][j] = 1
      }
    }
    
    let graphDataStructure = {
            labels: this.state.datesData,
            datasets: [
                {
                    label: 'UK COVID Cases',
                    data: this.state.ukData.cases,
                    backgroundColor: 'blue'
                },
                {
                    label: 'UK COVID Deaths',
                    data: this.state.ukData.deaths,
                    backgroundColor: 'magenta'
                }
            ]
        }

        let graphDataStructure2 = {
            labels: ['England Cases', 'Wales Cases', 'Scotland Cases'],
            datasets: [
                {
                    label: 'UK COVID Cases',
                    data: [this.state.englandData.cases[this.state.englandData.cases.length - 1],
                    this.state.walesData.cases[this.state.walesData.cases.length - 1],
                    this.state.scotlandData.cases[this.state.scotlandData.cases.length - 1]],
                    backgroundColor: ['blue', 'cyan', 'magenta']
                }
            ]
        }


       let graphDataStructure3 = {
            labels: ['England Deaths', 'Wales Deaths', 'Scotland Deaths'],
            datasets: [
                {
                    label: 'UK COVID Cases',
                    data: [this.state.englandData.deaths[this.state.englandData.deaths.length - 1],
                    this.state.walesData.deaths[this.state.walesData.deaths.length - 1],
                    this.state.scotlandData.deaths[this.state.scotlandData.deaths.length - 1]],
                    backgroundColor: ['Green', 'Yellow', 'Red']
                }
            ]
        }


        const graphOptions = {
            responsive: true,
            title: { text: "UK COVID Cases Tracker ", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
            pan: {
              enabled: true,
              mode: "xy",
              speed: 10,
            },
            zoom: {
              enabled: true,
              drag: true,
              mode: "xy",
              rangeMin: {
                x: 2,
                y: 1,
              },
              rangeMax: {
                x: 10,
                y: 60,
              },
            },
          }
        

        const graphOptions2 = {
            responsive: true,
            title: { text: "COVID Cases Distributed by Nation", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
            pan: {
              enabled: true,
              mode: "xy",
              speed: 10,
            },
            zoom: {
              enabled: true,
              drag: true,
              mode: "xy",
              rangeMin: {
                x: 2,
                y: 1,
              },
              rangeMax: {
                x: 10,
                y: 60,
              },
            },
          }

              const graphOptions3 = {
            responsive: true,
            title: { text: "Covid Deaths Distributed by Nation", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
            pan: {
              enabled: true,
              mode: "xy",
              speed: 10,
            },
            zoom: {
              enabled: true,
              drag: true,
              mode: "xy",
              rangeMin: {
                x: 2,
                y: 1,
              },
              rangeMax: {
                x: 10,
                y: 60,
              },
            },
          }
        
        
        const mapData = {
            countries: {
                england: {
                    name: 'England',
                    cases: this.state.englandData.cases[this.state.englandData.cases.length - 1],
                    deaths: this.state.englandData.deaths[this.state.englandData.deaths.length - 1]
                },                
                wales: {
                    name: 'Wales',
                    cases: this.state.walesData.cases[this.state.walesData.cases.length - 1],
                    deaths: this.state.walesData.deaths[this.state.walesData.deaths.length - 1]
                },
                scotland: {
                    name: 'Scotland',
                    cases: this.state.scotlandData.cases[this.state.scotlandData.cases.length - 1],
                    deaths: this.state.scotlandData.deaths[this.state.scotlandData.deaths.length - 1]
                }
            }
        }


        return (
            <div>
                <div className = 'graph'>
                    <h2>Graph Test</h2>
                <Bar 
                data = {graphDataStructure}
                options = {graphOptions}
                />
                <Pie data = {graphDataStructure2} options = {graphOptions2}/>
                <Pie data = {graphDataStructure3} options = {graphOptions3}/>
                <ReactMapGL
                    {...this.state.viewport}
                    mapboxApiAccessToken = {'pk.eyJ1Ijoibm9wbGFudGFpbmdvYmFuYW5hIiwiYSI6ImNrczBobnducTFrMTcycHBzc3VndTRncnUifQ.iZmdLh2E80msmveE9AjhiA'}
                    onViewportChange = {viewport => {
                        const newViewport = viewport
                        newViewport.zoom = 4
                        console.log(viewport.zoom)
                        this.setState({
                            viewport: newViewport
                        })
                    }}
                    mapStyle = {'mapbox://styles/noplantaingobanana/cks2coj1h2e8718o4j4atiyjf'}
                    
                    >
                        <Marker key = {2} 
                            latitude = {eX} 
                            longitude = {eY}>
                            <Circle cases = {this.state.englandData.cases[this.state.englandData.cases.length - 1]} colour = 'rgba(0, 2, 0, 0.5)' radious = {mapData.countries.england.cases * mapData.countries.england.cases }/>
                        </Marker>
                        <Marker key = {2} 
                            latitude = {wX} 
                            longitude = {wY}>
                                <Circle data = {[23, 493]} colour = 'rgba(0, 2, 0, 0.5)' radious = {20}/>
                        </Marker>
                        <Marker key = {2} 
                            latitude = {sX} 
                            longitude = {sY}>
                                <Circle data = {[23, 243]} colour = 'rgba(0, 2, 0, 0.5)' radious = {20}/>
                        </Marker>
                    </ReactMapGL>       
                </div>
            </div>
        )
    }
}

export default PlotData