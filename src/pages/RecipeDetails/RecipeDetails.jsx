import { Bookmark, Loader, PenLine, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
const RecipeDetails = () => {
  const recipeData = useLoaderData();

  const { authorName, authorImage } = recipeData;
  const [recipe, setRecipe] = useState(recipeData);
  const [authorData, setAuthorData] = useState({
    id: null,
  });
  const [savedRecipe, setSavedRecipe] = useState(false);
  const { user, setLoading, loading } = useContext(AuthContext);

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
        });
        console.log(authorData.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [user]);

  const handleLike = async () => {
    try {
      if (recipe.authorId === authorData.id) {
        toast.error("You can't like your own recipe!");
        return;
      }

      const response = await fetch(
        `https://server-recipe-book-theta.vercel.app/recipes/${recipe._id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: authorData.id }),
        }
      );

      if (response.ok) {
        await response.json();
        setRecipe((prev) => ({
          ...prev,
          likeCount: prev.likeCount + 1,
        }));
        toast.success("Recipe liked successfully!");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
      toast.error("Failed to like recipe.");
    }
  };

  const handleBookmark = () => {
    if (savedRecipe) {
      setSavedRecipe(false);
      toast.success("Recipe removed from bookmarks!");
    } else {
      setSavedRecipe(true);
      toast.success("Recipe added to bookmarks!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center text-violet-600 items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Spacer */}
      <div className="hidden md:block md:col-span-2" />

      {/* Main Content */}
      <article className="md:col-span-8 space-y-6">
        {/* Author Info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <img
            src={authorImage}
            alt={`${authorName}'s profile`}
            className="h-12 w-12 rounded-full object-cover border ring-2 ring-primary ring-offset-2"
          />
          <h2 className="text-lg sm:text-xl font-semibold">{authorName}</h2>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <PenLine className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" />
            <span className="text-sm sm:text-base">(Author)</span>
          </div>
        </div>

        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow"
        />

        {/* Like & Bookmark */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <ThumbsUp
              onClick={handleLike}
              className="cursor-pointer hover:text-blue-600 transition"
            />
            <span className="text-sm">{recipe.likeCount} likes</span>
          </div>
          <Bookmark
            onClick={handleBookmark}
            className={`cursor-pointer transition ${
              savedRecipe ? "text-yellow-500" : "hover:text-yellow-500"
            }`}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-violet-600">
          {recipe.title}
        </h1>

        {/* Ingredients */}
        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">
            Ingredients
          </h3>
          <p className="text-gray-700 white-text">{recipe.ingredients}</p>
        </section>

        {/* Instructions */}
        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-violet-600">
            Instructions
          </h3>
          <p className="text-gray-700 whitespace-pre-line white-text">
            {recipe.instructions}
          </p>
        </section>

        {/* Prep Time & Categories */}
        <section className="flex flex-col sm:flex-row gap-2 text-sm sm:text-base text-gray-600">
          <span className="text-green-600">
            <strong>Prep Time:</strong> {recipe.preparationTime} Mins
          </span>
          <span className="text-green-600">
            <strong>Categories:</strong> {recipe.categories?.join(", ")}
          </span>
        </section>

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <Link className="btn btn-secondary" to="/all-recipe">
            Back to All Recipes
          </Link>
        </div>
      </article>

      {/* Right Spacer */}
      <div className="hidden md:block md:col-span-2" />
    </div>
  );
};

export default RecipeDetails;
