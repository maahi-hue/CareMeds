import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import PopularCategory from "../PopularCategory/PopularCategory";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto">
        <Category></Category>
        {/* <PopularCategory></PopularCategory>
        <Featured></Featured>
        <Testimonials></Testimonials> */}
      </div>
    </div>
  );
};

export default Home;
