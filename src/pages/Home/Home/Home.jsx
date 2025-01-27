import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import DiscountMedicines from "../DiscountMedicines/DiscountMedicines";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto">
        <Category></Category>
        <DiscountMedicines></DiscountMedicines>
       
        <Featured></Featured>
        <Testimonials></Testimonials> 
      </div>
    </div>
  );
};

export default Home;
