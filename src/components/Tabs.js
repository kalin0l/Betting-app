import React from "react";
import { SportContext } from "../context/context";

const Tabs = () => {
const {isClicked,setIsClicked} = React.useContext(SportContext)
  return (
    <div className="sports-tabs">
      <button onClick={() => setIsClicked(false)}>Live events</button>
      {!isClicked && <span></span>}
      <button onClick={() => setIsClicked(true)}>Past events</button>
      {isClicked && <span className={isClicked ? "past-events" : null}></span>}
    </div>
  );
};

export default Tabs;
