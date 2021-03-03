import React from 'react'
import  "./Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { showDataOnMap } from "./util";


function Map({countries,center1,zoom1, casesType}) {
  
  
    return (
        <div className="map">




<MapContainer center={center1} zoom={zoom1}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

{showDataOnMap(countries, casesType)}
  </MapContainer>
        </div>
    )
}

export default Map
