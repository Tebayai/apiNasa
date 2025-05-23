

export default function MarsWeatherCard({title,value, unit}) {
    return (
        <div>
            <h2>{title}</h2>
            {value !== null ? (
                <p>{value} {unit}</p>
            ) : (
                <p>Données non disponibles</p>
            )}
        </div>
    );
}