import { useContext } from "react"
import DashboardContext from "../Context/DashboardContext"
import Awareness from "../Chart/Awareness"

export default function Dashboard () {
    const { data } = useContext(DashboardContext)
    return <>
        {data && 
            data.map(x => <li key={x.title}>{x.title}</li>) 
        }
        <Awareness />
    </>

}