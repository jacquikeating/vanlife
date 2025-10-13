import React from "react"
import { useParams } from "react-router-dom"

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => console.log(data.vans[0]))
    }, [])

    return (
        <h1>HostVanDetail page goes here</h1>
    )
}