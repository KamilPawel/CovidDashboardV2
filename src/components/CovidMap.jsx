import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';


import parkData from './cityData/cityLocations.json'

import Circle from './Circle'
import './Covid.css'




window.data = parkData
const correctCoortdinates = (x, y) => {
    return [x + 0.5, y - 5.5]
}

const [x, y] = [53.581794, -4.562387]

const [eX, eY] = correctCoortdinates(52.3555, 1.1743)
const [wX, wY] = correctCoortdinates(52.1307, 3.7837)
const [sX, sY] = correctCoortdinates(56.4907, 5 - 4.2026)


const CovidMap = (props) => {
    const [viewport, setViewport] = useState({
        width: '70vw',
        height: '80vh',
        latitude: x,
        longitude: y,
        zoom: 4
    });

    const {countryData} = props
    console.log('printing the props')
    console.log(countryData)

    return (
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken = {'pk.eyJ1Ijoibm9wbGFudGFpbmdvYmFuYW5hIiwiYSI6ImNrczBobnducTFrMTcycHBzc3VndTRncnUifQ.iZmdLh2E80msmveE9AjhiA'}
        onViewportChange = {viewport => {
            const newViewport = viewport
            newViewport.zoom = 4
            console.log(viewport.zoom)
            setViewport(newViewport)
        }}
        mapStyle = {'mapbox://styles/noplantaingobanana/cks2coj1h2e8718o4j4atiyjf'}

        >
            <Marker key = {2} 
                latitude = {eX} 
                longitude = {eY}>
                    <Circle data = {[534, 234]} colour = 'rgba(0, 2, 0, 0.5)' radious = {20}/>
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
  );
}
export default CovidMap

//<Circle data = {"display Something"} radious = {50} colour = 'rgba(255, 0, 0, 0.2)' />