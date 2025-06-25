import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "Italian",
    preparationTime: 0,
    categories: [],
    likeCount: 0,
  });

  const { user, setLoading } = useContext(AuthContext);

  const [authorData, setAuthorData] = useState({
    id: null,
    name: null,
    image: null,
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://server-recipe-book-theta.vercel.app/users/${user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setAuthorData({
          id: data._id,
          name: data.name || user.displayName || user.email.split("@")[0],
          image: data.image || user.photoURL || "",
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
        setAuthorData({
          id: user.uid,
          name: user.displayName || user.email.split("@")[0],
          image: user.photoURL || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [user]);

  const navigate = useNavigate();

  const cuisineOptions = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
  const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { image, title, ingredients, instructions, preparationTime } =
      formData;

    if (
      !image.trim() ||
      !title.trim() ||
      !ingredients.trim() ||
      !instructions.trim() ||
      preparationTime <= 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const newRecipe = {
        ...formData,
        authorId: authorData.id,
        authorName: authorData.name,
        authorImage: authorData.image,
      };

      const response = await fetch(
        "https://server-recipe-book-theta.vercel.app/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        }
      );

      await response.json();

      toast.success("Recipe successfully added!");
      navigate("/all-recipe");

      setFormData({
        image: "",
        title: "",
        ingredients: "",
        instructions: "",
        cuisine: "Italian",
        preparationTime: 0,
        categories: [],
        likeCount: 0,
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Failed to add recipe.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 add-recipe-form shadow-2xl rounded-2xl mt-10 md:mt-20"
    >
      <h2 className="text-3xl font-bold mb-4 title text-center">
        Add a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium">Cuisine Type</label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Categories</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryOptions.map((category) => (
              <label key={category} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={category}
                  checked={formData.categories.includes(category)}
                  onChange={handleCheckboxChange}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 px-4 cursor-pointer rounded hover:bg-violet-700"
        >
          Add Recipe
        </button>
      </form>
    </motion.div>
  );
};

export default AddRecipe;
