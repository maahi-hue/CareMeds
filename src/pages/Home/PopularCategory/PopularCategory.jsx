import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCategory from "../../../hooks/useCategory";
import CategoryItem from "../../Shared/CategoryItem/CategoryItem";

const PopularCategory = () => {
  const [menu] = useCategory();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="mb-12">
      <SectionTitle
        heading="From Our Category"
        subHeading="Popular Items"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10">
        {popular.map((item) => (
          <CategoryItem key={item._id} item={item}></CategoryItem>
        ))}
      </div>
      <button className="btn btn-outline border-0 border-b-4 mt-4">
        View Full Category
      </button>
    </section>
  );
};

export default PopularCategory;
