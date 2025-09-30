import  { useEffect, useState } from "react" 
import { useParams } from "react-router-dom"
   
export default function VanDetail() {
    const [van, setVan] = useState(null)
    const { vanID } = useParams()

    useEffect(() => {
        fetch(`/api/vans/${vanID}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [vanID])


    return <h1>Van detail page goes here</h1>
}