import Lottie from "lottie-react";
import values from "../../../assets/values.json";

const Testimonials = () => {
  return (
    <section className="my-10 px-8">
      <h2 className="text-4xl font-bold text-center">Our Values</h2>

      <div className="flex flex-col items-center">
        <Lottie
          animationData={values}
          loop={true}
          className="w-80 h-80 md:w-96 md:h-96"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Quality</h3>
          <p className="">
            We are committed to offering only the highest quality medicines
            sourced from trusted, verified vendors. Each product is carefully
            vetted to ensure the best possible care for our customers.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Customer-Centricity</h3>
          <p className="">
            Your health and satisfaction are our top priorities. We aim to
            provide a seamless shopping experience with fast delivery, secure
            payments, and responsive customer service.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">Accessibility</h3>
          <p className="">
            We believe that everyone deserves access to essential medicines. Our
            platform is designed to be easy to navigate, ensuring that you can
            find and purchase what you need with ease, anytime, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
