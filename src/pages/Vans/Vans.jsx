import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Vans() {
    const [vans, setVans] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

	useEffect(() => {
	  fetch("/api/vans")
	    .then(res => res.json())
	    .then(data => setVans(data.vans))
	}, [])

    const displayedVans = typeFilter 
        ? vans.filter(van => van.type === typeFilter)
        : vans

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <img src={van.imageUrl} alt={`${van.name} van parked outdoors.`} />
            <div className="van-info">
                <h2>{van.name}</h2>
                <p>${van.price}<span>/day</span></p>
            </div>
            <span className={`van-type ${van.type} selected`}>{van.type}</span>
        </div>
    ))
	
	return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button onClick={() => setSearchParams({type: "simple"})} 
                    className={
                        `van-type simple ${typeFilter === "simple" ? "selected" : ""}`
                    }>
                    Simple
                </button>
                <button onClick={() => setSearchParams({type: "luxury"})} 
                    className={
                        `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`
                    }>
                    Luxury
                </button>
                <button onClick={() => setSearchParams({type: "rugged"})} 
                    className={
                        `van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`
                    }>
                    Rugged
                </button>
                {typeFilter && <button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear filters</button>}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}