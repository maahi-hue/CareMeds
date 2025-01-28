import { useEffect, useState } from "react";
import CategoryItem from "../../Shared/CategoryItem/CategoryItem";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";

const Category = () => {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: filteredCategories } = await axios.get(
          `/filtered-categories`
        );

        const { data: manualCategories } = await axiosPublic.get(`/categories`);

        const allCategories = [
          ...manualCategories,
          ...filteredCategories,
        ].reduce((unique, item) => {
          if (!unique.some((cat) => cat.name === item.name)) {
            unique.push(item);
          }
          return unique;
        }, []);

        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container px-6 mt-20">
      <h1 className="text-4xl my-4 text-center font-bold">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 xl:mt-16 place-items-center">
        {categories.map((category) => (
          <div key={category.name} className="w-full max-w-[300px] mx-auto">
            <CategoryItem category={category}></CategoryItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
