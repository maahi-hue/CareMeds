import { Helmet } from "react-helmet-async";
import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> CareMeds</title>
      </Helmet>
      <Carousel></Carousel>
      <Category></Category>
    </div>
  );
};

export default Home;
