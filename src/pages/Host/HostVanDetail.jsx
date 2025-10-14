import React from "react"
import { useParams } from "react-router-dom"

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setCurrentVan(data.vans))
    }, [])

    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="host-van" key={currentVan.id}>
            <img src={currentVan.imageUrl} alt={`Photo of ${currentVan.name}`} />
            <div className="host-van-info">
                <h3>{currentVan.name}</h3>
                <p>${currentVan.price}/day</p>
            </div>
        </div>
    )
}