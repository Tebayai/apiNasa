

export default function PictureOfTheDay({picture}){
    if (!picture) {
        return <p>Loading...</p>;
    }
    return(
        <div>
            <h1>{picture.title}</h1>
            {picture.media_type === "image" ? (
                <img src={picture.url} alt={picture.title} />
            ) : (
                <iframe
                    title={picture.title}
                    width="550"
                    height="350"
                    src={picture.url}
                    allowFullScreen
                ></iframe>
            )}
            <p>{picture.explanation}</p>
        </div>
    )
}