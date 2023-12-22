import React, { useEffect } from "react";
import L from "leaflet";

const Map = () => {
  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const drawnMarkers = [];

    const handleMapClick = (e) => {
      const markerColor = document.querySelector(
        'input[name="markerColor"]:checked'
      ).value;
      const markerType = document.getElementById("markerType").value;
      const reason = document.getElementById("reason").value;

      const dot = L.circleMarker(e.latlng, {
        radius: 5,
        color: "black",
        fillColor: markerColor === "red" ? "red" : "green",
        fillOpacity: 1,
      }).addTo(map);

      drawnMarkers.push({
        latLng: e.latlng,
        color: markerColor,
        type: markerType,
        reason: reason,
      });
    };

    map.on("click", handleMapClick);

    document.getElementById("submitBtn").addEventListener("click", () => {
      console.log(drawnMarkers);
      // You can perform further processing or send the data to a server here
    });

    return () => {
      // Clean up resources when component unmounts
      map.off("click", handleMapClick);
      map.remove();
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>
      <div>
        <label>
          <input type="radio" name="markerColor" value="red" checked /> Red
        </label>
        <label>
          <input type="radio" name="markerColor" value="green" /> Green
        </label>
      </div>
      <div>
        <label>
          Marker Type:
          <select id="markerType">
            <option value="tourist">Tourist</option>
            <option value="local">Local</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Reason:
          <textarea id="reason"></textarea>
        </label>
      </div>
      <div>
        <button id="submitBtn">Submit</button>
      </div>
    </div>
  );
};

export default Map;
