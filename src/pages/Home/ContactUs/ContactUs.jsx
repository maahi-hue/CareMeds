import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_31npfki",
        "template_8ct9s88",
        form.current,
        "m0LPtHc-NFlgvY4Pz"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent",
            text: "Your message was sent successfully!",
            confirmButtonColor: "#52796f",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Message Failed",
            text: "Failed to send your message. Please try again.",
            confirmButtonColor: "#52796f",
          });
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div className=" p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold  mb-8">Contact Us</h1>
        <p className="text-lg  mb-12 max-w-4xl mx-auto">
          We would love to hear from you! Whether you have a question,
          suggestion, or just want to say hi, feel free to reach out.
        </p>

        <div className="flex justify-center space-x-8 mb-16">
          <div className="flex items-center space-x-4 p-6 border border-inherit shadow-lg rounded-xl w-64">
            <FaPhoneAlt className="text-4xl" />
            <div>
              <h3 className="text-2xl font-bold">Phone</h3>
              <p className="text-lg ">+1 (234) 567-890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 border border-inherit shadow-lg rounded-xl w-64">
            <FaEnvelope className="text-4xl" />
            <div>
              <h3 className="text-2xl font-bold">Email</h3>
              <p className="text-lg ">contact@bistroboard.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 border border-inherit shadow-lg rounded-xl w-64">
            <FaMapMarkerAlt className="text-4xl" />
            <div>
              <h3 className="text-2xl font-bold">Address</h3>
              <p className="text-lg ">123 Sports Avenue, Cityville, Country</p>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold  mb-8">Get in Touch</h2>
        <div className=" p-8 rounded-lg shadow-xl ">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="grid grid-cols-1 gap-6"
          >
            <div>
              <label className="block text-lg font-medium">Full Name</label>
              <input
                type="text"
                name="from_name"
                placeholder="Enter your full name"
                className="w-full p-3 mt-2 rounded-lg   border border-[#ddd]"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                name="from_email"
                placeholder="Enter your email"
                className="w-full p-3 mt-2 rounded-lg   border border-[#ddd]"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                rows="5"
                className="w-full p-3 mt-2 rounded-lg   border border-[#ddd]"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold py-3 px-8 rounded-lg "
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
