import { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "../../Shared/CategoryItem/CategoryItem";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: filteredCategories } = await axios.get(
          `${import.meta.env.VITE_API_URL}/filtered-categories`
        );

        const { data: manualCategories } = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );

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
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-3 lg:grid-cols-4 ">
        {categories.map((category) => (
          <div key={category.name}>
            <CategoryItem category={category}></CategoryItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
