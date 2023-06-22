import { useEffect } from "react";
import LocationCards from "../../components/Card/LocationCard";
import { useSelector } from "react-redux";
function WishList() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  console.log("User Data From Wish List ", user);
  return (
    <>
      <LocationCards cards={user?.favourites} />;
    </>
  );
}
export default WishList;
