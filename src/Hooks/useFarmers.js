import { useEffect, useState } from "react";

const useFarmers =()=>{
    const [farmers, setFarmers] = useState([])
    useEffect(() => {
        const url = `http://localhost:5001/all-user`;
        fetch(url)
            .then(res => res.json())
            .then(data => setFarmers(data))

    }, [])
    return [farmers,setFarmers]
}
export default useFarmers;