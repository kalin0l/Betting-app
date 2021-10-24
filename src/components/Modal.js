import React from 'react';
import { GrClose } from "react-icons/gr";
import { SportContext } from '../context';


const Modal = ({isModal}) => {
    const {setInfo} = React.useContext(SportContext);
    return (
        <div className='modal'>
        <button className='close-btn' onClick={() => setInfo(false)}><GrClose /></button>
       {isModal && <div className='info-section'>
            <p>{isModal.sport.name}</p>
            <h1>{isModal.section.name} - {isModal.challenge.name}</h1>
            <h1>{isModal.name} - Round: {isModal.round_number}</h1>
            {isModal.home_score !== null && <p>{isModal.home_score.current}:{isModal.away_score.current} - {isModal.status_more}</p>}
        </div>}
    </div>
    )
}
export default Modal;