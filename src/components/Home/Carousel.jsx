import bgimg1 from "../../assets/images/carousel1.jpg";
import bgimg2 from "../../assets/images/carousel2.jpg";
import bgimg3 from "../../assets/images/carousel3.jpg";
import bgimg4 from "../../assets/images/carousel4.jpg";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Carousel = () => {
  return (
    <div className="relative h-[60vh]">
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
        <div data-src={bgimg1} className="brightness-50" />
        <div data-src={bgimg2} className="brightness-50" />
        <div data-src={bgimg3} className="brightness-50" />
        <div data-src={bgimg4} className="brightness-50" />
      </AutoplaySlider>
    </div>
  );
};

export default Carousel;
