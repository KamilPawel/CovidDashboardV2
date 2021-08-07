import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';


import parkData from './cityData/cityLocations.json'

import Circle from './Circle'
import './Covid.css'




window.data = parkData
const correctCoortdinates = (x, y) => {
    return [x + 0.4, y - 0.6]
}

const [x, y] = [53.581794, -4.562387]

const [mx, my] = [52.950001, -1.150000]

const [lx, ly] = correctCoortdinates(51.509865, -0.118092)

const [manX, manY] = correctCoortdinates(mx, my)


const CovidMap = () => {
    const [viewport, setViewport] = useState({
        width: '30vw',
        height: '80vh',
        latitude: x,
        longitude: y,
        zoom: 4
    });



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
        mapStyle = {'mapbox://styles/noplantaingobanana/cks0ixbrt61od18nx0z6z7gtp'}
        >
            <Marker key = {2} 
                latitude = {manX} 
                longitude = {manY}>
                    <Circle data = {[23, 493]} colour = 'rgba(255, 0, 0, 0.2)' radious = {20}/>
            </Marker>
        </ReactMapGL>
  );
}
export default CovidMap

//<Circle data = {"display Something"} radious = {50} colour = 'rgba(255, 0, 0, 0.2)' />