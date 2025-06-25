import { use, useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const { loading } = use(AuthContext);

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === "all") return true;
    return recipe.cuisine.includes(filter);
  });

  useEffect(() => {
    fetch("https://server-recipe-book-theta.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center text-violet-600 items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-violet-600">
        All Recipes
      </h2>

      {/* select */}

      <select
        className="select select-bordered w-1/3 bg-black/30 backdrop-blur-sm text-white mb-10 mt-5"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Cuisine</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="Others">Others</option>
      </select>

      {/* select */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
            key={recipe._id}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default AllRecipes;
