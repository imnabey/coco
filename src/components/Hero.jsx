import React, { useState, useEffect } from "react";
import cari from "../assets/cari-logo.png";
// import DisplayMap from "./DisplayMap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng, LatLngBounds } from "leaflet";
import { coordinates } from "/src/data/Coordinates";

function Hero() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setToggle(!toggle);
  };

  const [center, setCenter] = useState(new LatLng(-2.5, 117));
  const [zoom, setZoom] = useState(5);
  const indonesiaMap = new LatLngBounds(
    new LatLng(-11.05, 94.85),
    new LatLng(6.2, 141.05)
  );

  function renderMarkers() {
    return coordinates.map(coord => (
      <Marker key={coord.code} position={[coord.latitude, coord.longitude]}>
        <Popup>
          <div>
            <h3>{coord.name}</h3>
            <p>Publications: {coord.total}</p>
          </div>
        </Popup>
      </Marker>
    ));
  }

  return (
    <div className="relative">
      <nav
        className={`absolute flex items-center justify-between flex-wrap top-5 right-5 z-20 w-2/4 p-6 bg-zinc-800/25    hover:-translate-y-2  transition transform rounded-md  ${
          toggle ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a href="https://caribencana.id/">
            <img
              className="fill-current  w-30 mr-2"
              width="80"
              height="80"
              viewBox="0 0 54 54"
              src={cari}
              alt="CARI Website"
            ></img>
          </a>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-zinc-800/75"
            >
              Home
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-zinc-800/75"
            >
              Knowledge Portal
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white  mr-4 hover:text-zinc-800/75"
            >
              Publications
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 hover:text-zinc-800/75"
            >
              Special Brief
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-zinc-800/75"
            >
              About
            </a>
          </div>

          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      <div className="relative top-0 left-0 h-500 w-full z-10 outline-none">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "70vh" }}
          scrollWheelZoom={false}
          maxBounds={indonesiaMap}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=o13sSPoD0cBH5pCHCAjP"
            attribution="<attribution>"
          />
          {renderMarkers()}
        </MapContainer>
      </div>
      <button
        className={`absolute top-2 right-2 z-20 bg-gray-900 hover:bg-gray-800  transition transform rounded-md focus:outline-none ${
          toggle ? "hidden" : "block"
        }`}
        onClick={toggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default Hero;
