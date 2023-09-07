import React, { useEffect, useState } from "react";

export function useGPS() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let intervalId;

    if ("geolocation" in navigator) {
      intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setLocation({ latitude, longitude });
          },

          (error) => {
            console.error("GPS情報を取得できませんでした。エラー: ", error);
          }
        );
      }, 1000);
    } else {
      console.error("Geolocation APIはサポートされていません。");
    }

    return () => clearInterval(intervalId);
  }, []);

  return location;
}
