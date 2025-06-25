import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AllRecipes from "../pages/AllRecipes/AllRecipes";
import MyRecipes from "../pages/MyRecipes/MyRecipes";
import AddRecipe from "../pages/AddRecipe/AddRecipe";
import PrivateRoute from "../providers/PrivateRoute";
import RecipeDetails from "../pages/RecipeDetails/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(
            "https://server-recipe-book-theta.vercel.app/recipes/top?limit=6"
          ),
      },
      {
        path: "/all-recipe",
        Component: AllRecipes,
      },
      {
        path: "/my-recipe",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe-details/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://server-recipe-book-theta.vercel.app/recipes/${params.id}`
          ),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/sign-in",
        Component: SignIn,
      },
      {
        path: "/auth/sign-up",
        Component: SignUp,
      },
      {
        path: "/auth/forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
]);

export default router;
