import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router";
import { Loader, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const cuisineOptions = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [authorId, setAuthorId] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const { user, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email) return setLoading(false);
      try {
        const res = await fetch(
          `https://server-recipe-book-theta.vercel.app/users/${user.email}`
        );
        const data = await res.json();
        setAuthorId(data._id);
      } catch (err) {
        console.error("Failed to fetch user ID:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, [user]);

  // Fetch user recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!authorId) return;
      try {
        const res = await fetch(
          `https://server-recipe-book-theta.vercel.app/my-recipes/${authorId}`
        );
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };
    fetchRecipes();
  }, [authorId]);

  const handleEditClick = (recipe) => {
    setEditingRecipe({
      ...recipe,
      categories: Array.isArray(recipe.categories) ? recipe.categories : [],
    });
    document.getElementById("edit_modal").showModal();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEditingRecipe((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
  };

  const updateRecipe = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedData } = editingRecipe;

      const res = await fetch(
        `https://server-recipe-book-theta.vercel.app/recipes/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const result = await res.json();
      if (result.modifiedCount > 0) {
        setRecipes((prev) =>
          prev.map((r) => (r._id === _id ? { ...r, ...updatedData } : r))
        );
        Swal.fire("Updated!", "Recipe updated successfully!", "success");
      } else {
        Swal.fire("No Changes", "Nothing was updated.", "info");
      }

      setEditingRecipe(null);
      document.getElementById("edit_modal").close();
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update recipe", "error");
    }
  };

  const deleteRecipe = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://server-recipe-book-theta.vercel.app/recipes/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (data.deletedCount) {
          setRecipes((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
        }
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error", "Failed to delete recipe", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center text-violet-600 items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-violet-600 mb-10">
        My Recipes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.3 }}
          >
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body body-of-card bg-blue-950 text-white">
                <h2 className="card-title">{recipe.title}</h2>
                <p>
                  {recipe.ingredients.length > 100
                    ? `${recipe.ingredients.slice(0, 100)}...`
                    : recipe.ingredients}
                  <Link
                    to={`/recipe-details/${recipe._id}`}
                    className="text-blue-400 ml-1 underline"
                  >
                    View Details
                  </Link>
                </p>
                <div className="card-actions justify-between mt-3">
                  <div className="badge badge-outline">
                    {recipe.categories?.join(", ")}
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp />
                    {recipe.likeCount}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(recipe)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-4">Edit Recipe</h3>
          {editingRecipe && (
            <form onSubmit={updateRecipe} className="space-y-4">
              <input
                type="text"
                name="image"
                value={editingRecipe.image}
                onChange={handleEditChange}
                className="w-full input input-bordered"
                placeholder="Image URL"
                required
              />
              <input
                type="text"
                name="title"
                value={editingRecipe.title}
                onChange={handleEditChange}
                className="w-full input input-bordered"
                placeholder="Title"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="ingredients"
                  value={editingRecipe.ingredients}
                  onChange={handleEditChange}
                  className="textarea textarea-bordered"
                  placeholder="Ingredients"
                  required
                />
                <textarea
                  name="instructions"
                  value={editingRecipe.instructions}
                  onChange={handleEditChange}
                  className="textarea textarea-bordered"
                  placeholder="Instructions"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="cuisine"
                  value={editingRecipe.cuisine}
                  onChange={handleEditChange}
                  className="select select-bordered w-full"
                >
                  {cuisineOptions.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="preparationTime"
                  value={editingRecipe.preparationTime}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                  min="1"
                  placeholder="Preparation Time (min)"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Categories</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {categoryOptions.map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={editingRecipe.categories.includes(category)}
                        onChange={handleCheckboxChange}
                        className="checkbox checkbox-sm"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setEditingRecipe(null);
                    document.getElementById("edit_modal").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyRecipes;
