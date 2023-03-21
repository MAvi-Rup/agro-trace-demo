import { useEffect, useState } from "react";

const useTransportPermit =()=>{
    const [transportPermits, setTransportPermit] = useState([])
    useEffect(() => {
        const url = `http://localhost:5001/all-tp`;
        fetch(url)
            .then(res => res.json())
            .then(data => setTransportPermit(data))

    }, [])
    return [transportPermits,setTransportPermit]
}
export default useTransportPermit;