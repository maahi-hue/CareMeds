import { BsFillHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Medicine"
        address="add-medicine"
      />
    </>
  );
};

export default SellerMenu;
