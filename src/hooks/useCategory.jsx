import { useEffect, useState } from "react";

const useCategory = () => {
  const [menu, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setLoading(false);
      });
  }, []);
  return [menu, loading];
};

export default useCategory;
