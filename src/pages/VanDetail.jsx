import { useParams } from "react-router-dom"

    export default function VanDetail() {
        const { vanID } = useParams()
        
        return <h1>Van detail page goes here</h1>
}