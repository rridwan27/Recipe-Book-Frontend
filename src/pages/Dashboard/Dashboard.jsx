import Sidebar from "../../components/Sidebar/Sidebar";
import { Loader } from "lucide-react";
import { use, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user, loading, setLoading } = use(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [myRecipesCount, setMyRecipesCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [authorId, setAuthorId] = useState(null);

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

  useEffect(() => {
    const fetchStats = async () => {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL ||
        "https://server-recipe-book-theta.vercel.app";

      try {
        const [allRes, myRes] = await Promise.all([
          fetch(`${baseUrl}/recipes`),
          fetch(`${baseUrl}/my-recipes/${authorId}`),
        ]);

        const allData = await allRes.json();
        const myData = await myRes.json();

        setTotalRecipes(allData.length || 0);
        setMyRecipesCount(myData.length || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (!loading && user?.uid) {
      fetchStats();
    }
  }, [user, loading]);

  if (loading || loadingStats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          mobileMenuOpen ? "hidden md:block" : "block"
        } md:ml-64`}
      >
        <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold dark:text-white">Dashboard</h1>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-violet-600 dark:text-violet-400 text-2xl"
          >
            ☰
          </button>
        </div>

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Total Recipes
              </h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400 mt-2">
                {totalRecipes}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Your Recipes
              </h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400 mt-2">
                {myRecipesCount}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Recent Activity
              </h3>
              <p className="text-violet-600 dark:text-violet-400 mt-2">
                Added {myRecipesCount} recipes in total
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
