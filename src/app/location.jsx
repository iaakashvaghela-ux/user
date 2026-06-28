"use client";

import { useState } from "react";

export default function LocationPermission() {
    const [status, setStatus] = useState("");

    const sendLocation = async () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation supported nahi hai.");
            return;
        }

        setStatus("Location permission mang rahe hain...");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                };

                try {
                    const res = await fetch("https://aks-furniture-server.onrender.com/save-location", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(locationData),
                    });

                    if (!res.ok) throw new Error("Server error");

                    setStatus("Location successfully server pe send ho gayi.");
                } catch (error) {
                    setStatus("Location send nahi ho payi.");
                }
            },
            
            () => {
                setStatus("User ne location permission deny kar di.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div>
            <button onClick={sendLocation}>
                Allow Location
            </button>

            <p>{status}</p>
        </div>
    );
}