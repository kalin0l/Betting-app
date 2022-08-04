import { SportContext } from "../context";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { AuthContext } from "../authContext";

const DepositModal = () => {
    const {user} = React.useContext(AuthContext);
  const { isDepositClicked, dispatch,depositHandler } = React.useContext(SportContext);
  const [deposit,setDeposit] = useState(0);
  const closingModal = () => {
    dispatch({ type: "OPEN_DEPOSIT" });
  };
 
  
  return (
    <div className={`${isDepositClicked ? " deposit-modal openModal" : "closeModal"}`}>
      <button className="close-deposit-btn" onClick={closingModal}>
        <GrClose />
      </button>
      <div className="deposit">
        <label>
          <h3>Deposit</h3>
          <input type="text" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        </label>
      </div>
      <div className="deposit-btn-container">
        <button type="button" className="deposit-btn" onClick={() => depositHandler(deposit,user.userId)}>Deposit</button>

      </div>
    </div>
  );
};

export default DepositModal;
