//import React from "react";
import Styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CityContext } from "../../contexts/CitiesContext";
import { useGeolocation } from "../Hooks/UseGeolocation";
import { LanLatLocation } from "../Hooks/latlnglocationURL";
function Map() {
  const { citiesdata } = useContext(CityContext);
  const [mapPosition, setmapPosition] = useState([51.505, -0.09]);
  const { isLoading, position, getPosition } = useGeolocation();

  const navigation = useNavigate();

  const [lat, lng] = LanLatLocation();

  useEffect(() => {
    if (lat && lng) setmapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (position) setmapPosition(position);
  }, [getPosition]);
  // console.log(position);
  return (
    // onClick={() => navigation("form")}

    <div className={Styles.map}>
      {/* checking if there is no current location that we clicked that the button shows else button disapears */}
      {position ? (
        ""
      ) : (
        <button className={Styles.locationposition} onClick={getPosition}>
          {isLoading ? "loading ...." : " use your location?"}
        </button>
      )}

      <MapContainer
        //center={mapPosition}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={Styles.maps}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {citiesdata.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenters position={mapPosition} />
        <DetectClick />

        {/* <div className={Styles.CurrentLocation}>
          <CurrentLocation />
        </div> */}
      </MapContainer>

      {/* <h1>MAP</h1> */}
    </div>
  );
}

//its function to movie to the location in map accordingly when the list of cities is being clicked it updates the  mapPosition to the current looped lat and lng values
const ChangeCenters = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

//  its actually a function to get the lng and lat cordinates from the location that is being clicked
// and  its purely a leaflet library function
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      console.log(navigate);
    },
  });
};

export default Map;
