import axios from "axios";
import { useEffect, useState } from "react";

const useRequestApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading]= useState(false)
  useEffect(() => {
    try {
        setLoading(true)
        axios.get(url).then((res) => {
          setData(res.data);
          setLoading(false)
        }); 
    } catch (error) {
        console.log(error)
        setLoading(false)

    }

  }, []);

  return { data, isLoading };
};
export default useRequestApi;
