import { useEffect, useState } from "react"

export default function useFetcher(path) {
    const [data, setData] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(path, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        }).then(res => {
            if (res.status !== 200) {
                return { status: 'error', message: res.statusText}
            }
            return res.json()
        }).then(res => {
            setLoading(false)
            if (res.status === "error") {
                return setError(res.message)
            }
            setData(res.data)
            setLoading(false)
        })
    }, [])
   

    return { data, error, isLoading}
}