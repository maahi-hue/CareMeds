import img1 from "../../../assets/home/1.jpg";
import img2 from "../../../assets/home/2.jpg";
import img3 from "../../../assets/home/3.jpg";
import img4 from "../../../assets/home/4.jpg";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
  return (
    <div className="relative  h-[60vh]">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white bg-black bg-opacity-30">
        <h1 className="text-4xl font-bold mb-2">Welcome to Gourmet Haven</h1>
        <p className="text-lg">
          Indulge in a delightful culinary journey with our exquisite dishes
          crafted to perfection.
        </p>
      </div>

      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={2000}
        className="h-full"
      >
        <div data-src={img1} className="brightness-50" />
        <div data-src={img2} className="brightness-50" />
        <div data-src={img3} className="brightness-50" />
        <div data-src={img4} className="brightness-50" />
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
