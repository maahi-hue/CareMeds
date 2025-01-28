import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import img1 from "../../../assets/home/1.jpg";
import img2 from "../../../assets/home/2.jpg";
import img3 from "../../../assets/home/3.jpg";
import img4 from "../../../assets/home/4.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const [sliderMedicines, setSliderMedicines] = useState([]);

  useEffect(() => {
    const fetchSliderMedicines = async () => {
      try {
        const { data } = await axiosPublic.get("/medicines?isInSlider=true");
        setSliderMedicines(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching slider medicines:", error);
        setSliderMedicines([]);
      }
    };

    fetchSliderMedicines();
  }, []);

  const fallbackImages = [
    { _id: "1", image: img1, name: "Default Image 1", description: "" },
    { _id: "2", image: img2, name: "Default Image 2", description: "" },
    { _id: "3", image: img3, name: "Default Image 3", description: "" },
    { _id: "4", image: img4, name: "Default Image 4", description: "" },
  ];

  const imagesToDisplay =
    sliderMedicines.length > 0 ? sliderMedicines : fallbackImages;

  return (
    <div className="relative h-[60vh]">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white bg-black bg-opacity-30">
        <h1 className="text-4xl font-bold mb-2">
          Your Trusted Marketplace for Medicines
        </h1>
        <p className="text-lg">
          Explore a wide range of medicines from trusted sellers, all in one
          place.
        </p>
      </div>

      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={2000}
        className="h-full"
      >
        {imagesToDisplay.map((item) => (
          <div key={item._id} data-src={item.image} className="brightness-50">
            {sliderMedicines.length > 0 && (
              <div className="absolute bottom-10 left-0 right-0 text-center px-4 py-2 bg-black bg-opacity-50 text-white">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
