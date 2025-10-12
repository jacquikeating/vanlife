import React from "react"

export default function HostVans() {
const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    return (
        <h1>HostVans page goes here</h1>
    )
}