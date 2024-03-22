import { Link } from "react-router-dom"
import { ITip } from "../interfaces/tip"

// TODO: Add Tailwind/CSS to the below. 
// User bio should also display here -
// on the card, or separately?

function Tip({ _id, name, cohort, emoji, heading, tip }: ITip) {
    return <div>
        <Link to={`/tips/${_id}`}>
            <div>{emoji}</div> 
            <div>{heading}</div>
            <div>{tip}</div>
            <div>{name}</div>
            <div>{cohort}</div>
        </Link>
    </div>
}

export default Tip