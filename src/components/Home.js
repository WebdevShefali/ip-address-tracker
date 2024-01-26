import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import locIcon from "../images/icon-location.svg";
import arrowIcon from "../images/icon-arrow.svg";
import Swal from "sweetalert2";
const api_key = process.env.REACT_APP_API_KEY;
console.log(api_key);
const Home = () => {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}`;
  const getData = async () => {
    const data = await fetch(url);
    const parsedData = await data.json();
    document.querySelector(".ipAddDetail").innerHTML = parsedData.ip;
    document.querySelector(".locationDetail").innerHTML =
      parsedData.location.city +
      ", " +
      parsedData.location.country +
      ", " +
      parsedData.location.region;
    document.querySelector(".timezoneDetail").innerHTML =
      "UTC - " + parsedData.location.timezone;
    document.querySelector(".ispDetail").innerHTML = parsedData.isp;
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    const map = L.map("map").setView(
      [parsedData.location.lat, parsedData.location.lng],
      13
    );

    const tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 35,
      }
    ).addTo(map);
    var locationIcon = L.icon({
      iconUrl: locIcon,
      iconSize: [40, 45], // size of the icon
    });

    const marker = L.marker(
      [parsedData.location.lat, parsedData.location.lng],
      { icon: locationIcon }
    ).addTo(map);
  };
  const handleClick = async () => {
    try {
      const ipAddInput = document.querySelector(".ipAddInput");
      const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ipAddInput.value}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      document.querySelector(".ipAddDetail").innerHTML = parsedData.ip;
      document.querySelector(".locationDetail").innerHTML =
        parsedData.location.city +
        ", " +
        parsedData.location.country +
        ", " +
        parsedData.location.region;
      document.querySelector(".timezoneDetail").innerHTML =
        "UTC - " + parsedData.location.timezone;
      document.querySelector(".ispDetail").innerHTML = parsedData.isp;
      var container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      const map = L.map("map").setView(
        [parsedData.location.lat, parsedData.location.lng],
        13
      );

      const tiles = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 35,
        }
      ).addTo(map);
      var locationIcon = L.icon({
        iconUrl: locIcon,
        iconSize: [40, 45], // size of the icon
      });

      const marker = L.marker(
        [parsedData.location.lat, parsedData.location.lng],
        { icon: locationIcon }
      ).addTo(map);
    } catch (error) {
      Swal.fire("Please enter a valid ip address.");
      document.querySelector(".ipAddDetail").innerHTML = "";
    document.querySelector(".locationDetail").innerHTML ="";
    document.querySelector(".timezoneDetail").innerHTML ="";
    document.querySelector(".ispDetail").innerHTML ="";
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="header">
        <h1> IP Address Tracker</h1>
        <div className="btnBox">
          <input
            type="text"
            placeholder="Search for any IP address"
            className="ipAddInput"
          />
          <button className="searchBtn" onClick={handleClick}>
            <img src={arrowIcon} />
          </button>
        </div>
      </div>
      <div className="details">
        <div className="ipAddress">
          <p>IP ADDRESS</p>
          <h4 className="ipAddDetail"></h4>
        </div>
        <div className="line"></div>
        <div className="location">
          <p>LOCATION</p>
          <h4 className="locationDetail"></h4>
        </div>
        <div className="line"></div>
        <div className="timeZone">
          <p>TIMEZONE</p>
          <h4 className="timezoneDetail"></h4>
        </div>
        <div className="line"></div>
        <div className="isp">
          <p>ISP</p>
          <h4 className="ispDetail"></h4>
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default Home;
