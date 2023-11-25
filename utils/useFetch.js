import { useState, useEffect} from "react";

export function useFetch(url) {

    const [data , setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => {
                setLoading(false)
                let select = document.getElementById('selectToLoad');
                data?.map( e  => {
                    let opt = document.createElement('option');
                    opt.innerText = e[0];
                    // @ts-ignore
                    select.appendChild(opt);
                })
            })
    }, []);

    return { data, loading, error }
}