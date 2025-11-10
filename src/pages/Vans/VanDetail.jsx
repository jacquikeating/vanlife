import { useEffect, useState } from "react" 
import { useParams, Link, useLocation } from "react-router-dom"
import { getVan } from "../../api"
   
export default function VanDetail() {
    const [van, setVan] = useState(null)
    const params  = useParams()
    const location = useLocation()
    const search = location.state?.search || ""

    useEffect(() => {
        async function loadVan() {
            const data = await getVan(params.id)
            setVan(data)
        }
        loadVan()
    }, [params.id])

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {search.substr(6) || "all"} vans</span></Link>

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