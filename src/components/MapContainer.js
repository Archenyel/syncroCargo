import React, { useState, useRef } from "react";
import { GoogleMap, StandaloneSearchBox, Marker,LoadScript } from "@react-google-maps/api";

const MapContainer = ( {onValueChange} ) => {
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.653304264095002,
    lng: -100.40398878811986,
  });
  const searchBox = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.712776,
    lng: -74.005974,
  });

  const mapContainerStyle = {
    width: "50%",
    height: "400px",
  };

  const onLoad = (ref) => {
    searchBox.current = ref;
  };

  const onPlacesChanged = () => {
    const selectedPlace = searchBox.current.getPlaces()[0];
    if (selectedPlace) {
      const { lat, lng } = selectedPlace.geometry.location;
      setMapCenter({ lat: lat(), lng: lng() });
      setPlaces([selectedPlace]);
    }
  };

  const markerOptions = {
    // Cambia el color del marcador aquí
    icon: {
      url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`, // URL de la imagen del marcador
      scaledSize: new window.google.maps.Size(30, 30), // Tamaño del marcador
    },
  };

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
        onClick={(event) => {
          setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
          onValueChange(event.latLng);  
        }}
      >
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Buscar lugares..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
        {places.map((place, index) => (
          <Marker
            options={markerOptions}
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
        <Marker position={markerPosition} />
      </GoogleMap>
  );
};

export default MapContainer;
