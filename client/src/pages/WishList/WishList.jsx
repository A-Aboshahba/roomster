import React from "react";
import LocationCards from "../../components/Card/LocationCard";
import { wishList } from "../../data/allData.jsx";

function WishList() {
  return (
    <>
      <LocationCards cards={wishList} />;
    </>
  );
}

export default WishList;
