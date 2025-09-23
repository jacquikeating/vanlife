import { useEffect, useState } from "react"

export default function Vans() {
    const [vans, setVans] = useState([])

	useEffect(() => {
	  fetch("/api/vans")
	    .then(res => res.json())
	    .then(data => setVans(data.vans))
	}, [])
	
	return (
        <>
            <h1>Explore our van options</h1>
            
            {vans.map(van => (
                <div key={van.id}>
                    <img src={van.imageUrl} alt={`${van.name} van parked outdoors.`}/>
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                    <p>{van.type}</p>
                </div>
            ))}
	    </>
    )
}