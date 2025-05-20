import { useState, useEffect } from 'react';

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMarsWeather() {
      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY;
        const response = await fetch(
          `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        const sols = data.sol_keys;
        if (!sols || sols.length === 0) {
          setTemperature(null);
          setWind(null);
          return;
        }
        const latestSol = sols[sols.length - 1];
        const tempF = data[latestSol]?.AT?.av ?? null; //recupère la data du dernier jours puis check si il y'a une valeur pour la température puis pour en Fahrenheit et verifie si il y'a bien une donnée
        const tempC = (tempF - 32) * (5 / 9); // conversion Fahrenheit vers Celsius trouve sur le net
        const windCalc = data[latestSol]?.HWS?.av ?? null;
        setTemperature(tempC);
        setWind(windCalc);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMarsWeather();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h1>Mars</h1>
      <h2>Température sur mars</h2>
      {temperature !== null ? (
        <p>{temperature.toFixed(1)} °C</p> // arrondis 1 chiffre après la virgule
      ) : (
        <p>Données non disponibles</p>
      )}
      <h2>Vent sur Mars</h2>
      {wind !== null ?(
        <p>{wind.toFixed(2)} m/s</p>
      ) : (<p>Données non disponibles</p>)}
    </div>
  );
}


