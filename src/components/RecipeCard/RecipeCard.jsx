import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { ThumbsUp } from "lucide-react";

const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure>
        <img
          src={recipe.image}
          className="w-full h-64 object-cover"
          alt={recipe.title || "Recipe Image"}
        />
      </figure>
      <div className="card-body bg-blue-950 body-of-card">
        <h2 className="text-center text-2xl pb-1 font-bold">{recipe.title}</h2>
        <div className="flex items-center justify-between flex-col">
          <p>
            <span className="font-bold text-lg">Cuisine:</span> {recipe.cuisine}
          </p>
          <p>
            <ThumbsUp className="inline mr-1" />
            {recipe.likeCount} people liked this recipe
          </p>
        </div>

        <div className="card-actions justify-center">
          {/* if user exists => to the details => or else to login page */}
          <Link to={user ? `/recipe-details/${recipe._id}` : "/auth/sign-in"}>
            <button className="btn btn-primary">View Recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
