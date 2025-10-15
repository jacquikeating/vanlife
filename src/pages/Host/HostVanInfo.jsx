import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {

    const [currentVan] = useOutletContext()

    console.log(currentVan)

    return (
        <h1>{currentVan.name}</h1>
    )
}