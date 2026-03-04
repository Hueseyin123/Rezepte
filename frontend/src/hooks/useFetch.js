
// Einfacher Fetch: Lädt Daten von einer URL, speichert sie zusammen mit Lade und Fehlerstatus und gibt { data, loading, error } zurück.

import { useEffect, useState } from "react";

const useFetch = (uri) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
        const res = await fetch (uri);
        const json = await res.json();

        setData (json);
        setLoading (false);
        } catch (error) {
        setError (error);
        setLoading (false);
        }
    }
    fetchData ();
        }, [uri]);

  return { data, loading, error };
  } 

  export default useFetch;
