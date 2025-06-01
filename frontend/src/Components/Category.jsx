import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Category = ({
  handleCategory,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/`
      );
      setCategories(response.data.categories || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch Categories."
      );
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="grid grid-cols-1">
      <button
        onClick={() => setSelectedCategoryId(null)}
        className={`btn btn-${
          setSelectedCategoryId === null ? "active" : "outline"
        } btn-primary`}
      >
        All
      </button>
      {categories &&
        categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategory(category._id)}
            className={`btn btn-${
              selectedCategoryId === category._id ? "active" : "outline"
            } btn-primary`}
            id={category._id}
          >
            {category.name}
          </button>
        ))}
    </div>
  );
};

export default Category;
