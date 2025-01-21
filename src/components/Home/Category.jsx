import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";
import slide5 from "../../assets/images/slide5.jpg";
import slide6 from "../../assets/images/slide6.jpg";

const medicineCategories = [
  { name: "Antibiotics", image: slide1, route: "/category/antibiotics" },
  { name: "Painkillers", image: slide2, route: "/category/painkillers" },
  { name: "Vitamins", image: slide3, route: "/category/vitamins" },
  { name: "Antiseptics", image: slide4, route: "/category/antiseptics" },
  { name: "Cough Syrups", image: slide5, route: "/category/cough-syrups" },
  {
    name: "Allergy Medicines",
    image: slide6,
    route: "/category/allergy-medicines",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-0">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-24"
        style={{
          "--swiper-pagination-bottom": "20px", // Adjust pagination position
          paddingBottom: "50px", // Add padding to the bottom of the Swiper wrapper
        }}
      >
        {medicineCategories.map((category, index) => (
          <SwiperSlide
            key={index}
            onClick={() => navigate(category.route)} // Navigate on click
            className="relative flex items-center justify-center bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.image})`, // Dark overlay
              height: "250px",
              width: "250px",
            }}
          >
            <h3 className="text-2xl uppercase text-center text-white font-bold">
              {category.name}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
