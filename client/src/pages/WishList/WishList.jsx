import LocationCards from "../../components/Card/LocationCard";
import { useSelector } from "react-redux";
function WishList() {
  const { user } = useSelector((state) => {
    return state.user;
  });
  return (
    <>
      <LocationCards cards={user.favourites} />;
    </>
  );
}
export default WishList;
