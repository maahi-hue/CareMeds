import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Pagination, Autoplay } from "swiper/modules";

const DiscountMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const [discountedMedicines, setDiscountedMedicines] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/medicines")
      .then((response) => {
        const discountedItems = response.data.filter(
          (item) => item.discount > 0
        );
        setDiscountedMedicines(discountedItems);
      })
      .catch((error) => {
        console.error("Error fetching discounted medicines", error);
      });
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-3xl text-center font-bold mb-10">
        Discounted Products
      </h2>
      {Array.isArray(discountedMedicines) && discountedMedicines.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {discountedMedicines.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="product-card p-4 border rounded-lg shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="text-center mb-40">
                  <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                  <p className="text-lg text-gray-500">{product.company}</p>
                  <p className="text-xl text-red-500 font-bold">
                    ${product.price - product.discount}{" "}
                    <span className="line-through text-gray-500">
                      ${product.price}
                    </span>
                  </p>
                  <p className="text-sm text-green-500">
                    Discount: {product.discount}%
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No discounted products available.</p>
      )}
    </div>
  );
};

export default DiscountMedicines;
