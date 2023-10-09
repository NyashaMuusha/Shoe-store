import { useState, useEffect, useRef } from "react";
import { baseUrl } from "./useFetch";

export default function useFetchAll(urls) {
  const prevUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Only run is the array of urls passed in changes
    if (areEqual(prevUrls.current, urls)) {
      setLoading(false);
      return;
    }

    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      }),
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}

const areEqual = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2(index))
  );
};
