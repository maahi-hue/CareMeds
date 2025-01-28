import logo from "../../../assets/icon/logo.png";
const Footer = () => {
  return (
    <footer>
      <div className="footer p-10 bg-[#789DBC] text-white">
        <div>
          <p className="flex items-center">
            <img className="h-6" src={logo} /> Ltd.
          </p>
          <p> Providing reliable medicines since 2025</p>
        </div>
      </div>
      <hr></hr>
      <div className="p-4 footer-center bg-[#789DBC] text-white ">
        <div>
          <p>Copyright © 2025 - All right reserved by CareMeds Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
