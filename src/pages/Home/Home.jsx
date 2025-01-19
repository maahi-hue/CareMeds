import { Helmet } from "react-helmet-async";
import Medicines from "../../components/Home/Medicines";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> CareMeds</title>
      </Helmet>
      <Medicines />
    </div>
  );
};

export default Home;
