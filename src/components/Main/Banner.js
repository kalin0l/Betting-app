import { BiArrowFromRight } from "react-icons/bi";
import { BiArrowFromLeft } from "react-icons/bi";
import { SportContext } from "../../context";
import React from "react";
import BannerEvents from "../BannerEvents";

function Banner() {
  const { nextSlide, prevSlide, info } =
    React.useContext(SportContext);

  return (
    <section className={`${info ? "section-banner shadow" : "section-banner"}`}>
      <div className="banner-arrows">
        <button type="submit" className="arrow-left" onClick={prevSlide}>
          <BiArrowFromRight />
        </button>
        <BannerEvents />
        <button type="submit" className="arrow-right" onClick={nextSlide}>
          <BiArrowFromLeft />
        </button>
      </div>
    </section>
  );
}
export default Banner;
