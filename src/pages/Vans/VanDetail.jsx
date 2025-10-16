import { useEffect, useState } from "react" 
import { useParams, Link } from "react-router-dom"
   
export default function VanDetail() {
    const [van, setVan] = useState(null)
    const params  = useParams()

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    return (
        <div className="van-detail-container">
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={`${van.name} van parked outdoors.`} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
                ) : <h2>Loading...</h2>
            }
        </div>
    )
}