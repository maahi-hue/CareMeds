import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCategory = () => {
  const { name, image, _id } = useLoaderData();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const category = {
        name: data.name,
        image: res.data.data.display_url,
      };
      const categoryRes = await axiosSecure.patch(
        `/categories/${_id}`,
        category
      );
      // console.log(categoryRes.data);
      if (categoryRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the categories.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>CareMeds | Update Category</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">Update Category</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Category Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
