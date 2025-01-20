import { Helmet } from "react-helmet-async";
import Carousel from "../../components/Home/Carousel";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> CareMeds</title>
      </Helmet>
      <Carousel></Carousel>
    </div>
  );
};

export default Home;
