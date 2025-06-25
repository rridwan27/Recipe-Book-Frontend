import { use, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Loader, ThumbsUp } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import Banner from "../../components/Banner/Banner";
import Typewriter from "../../components/Typewriter/Typewriter";
import StatsSection from "../../components/Stats/Stats";
import { Fade } from "react-awesome-reveal";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { loading } = use(AuthContext);

  const allRecipes = useLoaderData();

  console.log(allRecipes);

  useEffect(() => {
    setRecipes(allRecipes);
  }, [allRecipes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-violet-600 h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Typewriter />
      <Banner />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mt-8 mb-16">
          <h2 className="text-4xl font-semibold text-violet-600 mb-5 text-center">
            Top Liked Recipes
          </h2>
          <div className="border-b-2 border-violet-600 w-[200px] mx-auto"></div>
        </div>
        <Fade cascade damping={0.1} triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                className="card bg-base-100 w-full shadow-sm"
                key={recipe._id}
              >
                <figure>
                  <img
                    src={recipe.image}
                    className="w-full h-64 object-cover"
                    alt={recipe.title || "Recipe Image"}
                  />
                </figure>
                <div className="card-body bg-blue-950 body-of-card">
                  <h2 className="text-center text-2xl pb-1 font-bold">
                    {recipe.title}
                  </h2>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-center text-lg p-2 rounded">
                      <span className="font-bold">Cuisine:</span>{" "}
                      {recipe.cuisine}
                    </p>
                    <p className="text-md text-center">
                      <ThumbsUp className="inline mr-1" />
                      {recipe.likeCount} people liked this recipe
                    </p>
                  </div>

                  <div className="card-actions justify-center">
                    <Link to={`/recipe-details/${recipe._id}`}>
                      <button className="btn btn-primary">View Recipe</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Fade>

        {/* view button */}

        <div className="flex justify-center mt-10">
          <Link to="/all-recipe">
            <button className="btn btn-primary">View All Recipes</button>
          </Link>
        </div>
      </div>
      <StatsSection />
      <Newsletter />
    </div>
  );
};
export default Home;
