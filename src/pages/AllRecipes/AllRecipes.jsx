import { use, useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader } from "lucide-react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const { loading } = use(AuthContext);

  // Filter and safely sort recipes
  const filteredRecipes = recipes
    .filter((recipe) => {
      if (filter === "all") return true;
      return recipe.cuisine?.includes(filter);
    })
    .sort((a, b) => {
      // Safely get the name to compare (checks multiple possible property names)
      const nameA = (a.recipeName || a.name || a.title || "").toLowerCase();
      const nameB = (b.recipeName || b.name || b.title || "").toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  useEffect(() => {
    fetch("https://server-recipe-book-theta.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center text-violet-600 items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-violet-600">
        All Recipes
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-10 mt-5">
        {/* Cuisine Filter */}
        <select
          className="select select-bordered w-full md:w-1/3 bg-black/30 backdrop-blur-sm text-white"
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

        {/* Sort Order */}
        <select
          className="select select-bordered w-full md:w-1/3 bg-black/30 backdrop-blur-sm text-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No recipes found. Try adjusting your filters.
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AllRecipes;
