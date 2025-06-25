import { CalendarDays, BookOpen, Users, Star, ChefHat } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center gap-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-violet-700">
            Why Cooks Love <span className="text-pink-600">SpiceSpoon</span>
          </h2>
          <div className="border-b-2 border-violet-600 w-24"></div>
          <p className="text-gray-600 white-text max-w-xl mt-2 text-sm sm:text-base">
            We're on a mission to make your cooking journey smarter, simpler,
            and more inspiring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          <div className="bg-black/30 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <Users size={32} className="text-violet-600 mb-4 mx-auto" />
            <p className="text-3xl font-bold">
              {inView && <CountUp end={12000} duration={2} />}+
            </p>
            <p className="text-gray-600 white-text">Registered Users</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <BookOpen size={32} className="text-violet-600 mb-4 mx-auto" />
            <p className="text-3xl font-bold">
              {inView && <CountUp end={32000} duration={2} />}+
            </p>
            <p className="text-gray-600 white-text">Recipes Shared</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <CalendarDays size={32} className="text-violet-600 mb-4 mx-auto" />
            <p className="text-3xl font-bold">
              {inView && <CountUp end={5} duration={2} />}+
            </p>
            <p className="text-gray-600 white-text">Years Running</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <Star size={32} className="text-violet-600 mb-4 mx-auto" />
            <p className="text-3xl font-bold">
              {inView && <CountUp end={4800} duration={2} />}+
            </p>
            <p className="text-gray-600 white-text">5-Star Ratings</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <ChefHat size={32} className="text-violet-600 mb-4 mx-auto" />
            <p className="text-3xl font-bold">
              {inView && <CountUp end={850} duration={2} />}+
            </p>
            <p className="text-gray-600 white-text">Pro Chefs Joined</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
