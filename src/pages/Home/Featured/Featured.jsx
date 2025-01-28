import Lottie from "lottie-react";
import story from "../../../assets/story.json";
const Featured = () => {
  return (
    <section className="my-10 px-8 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold">Our Story</h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-center">
          <div className="flex justify-center lg:col-span-1">
            <Lottie
              animationData={story}
              loop={true}
              className="w-80 h-80 md:w-96 md:h-96"
            />
          </div>

          <div className="lg:col-span-2 text-left">
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Founded in 2025, our Multi-Vendor Medicine Selling E-commerce
              platform aims to provide customers with a seamless and reliable
              way to purchase a wide variety of medicines from multiple vendors.
              We’ve created a trusted marketplace that connects buyers with
              quality products from verified vendors, offering a user-friendly
              experience and the convenience of online shopping.
            </p>
            <p className="text-lg mt-2 leading-relaxed max-w-3xl mx-auto">
              Our platform is built with a commitment to quality, fast delivery,
              and excellent customer service, ensuring a smooth shopping
              experience for all our users. We look forward to serving your
              healthcare needs, providing access to a vast range of medicines,
              and supporting your wellness journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
