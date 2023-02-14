import { useState, useEffect } from "react";
import axios, { Method } from "axios"

export const useAxios = <T>(url:string, payload:Object, method: Method) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetch = async (data?:any) => {
    const accessToken = localStorage.getItem("a_token");
    return await axios({
      method: method,
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
      url,
      [(method === "get" || method==="GET") ? "params" : "data"]: data || payload,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        setData(response.data)
        return response.data;
      })
      .catch((error) => {
        setError(error.message)
        throw error
      })
      .finally(() => setLoaded(true));
  }
  
  return { data, error, loaded, fetch };
};