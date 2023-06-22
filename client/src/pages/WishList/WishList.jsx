import { useEffect } from "react";
import LocationCards from "../../components/Card/LocationCard";
import { useSelector } from "react-redux";
function WishList() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  console.log(user);
  useEffect(() => {}, [user.favourites]);
  return (
    <>
      <LocationCards cards={user?.favourites} />;
    </>
  );
}
export default WishList;
