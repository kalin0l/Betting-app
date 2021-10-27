import React from 'react';
import { GrClose } from "react-icons/gr";
import { SportContext } from '../context';


const Modal = ({isModal,show}) => {
    const {setInfo,setInProp,inProp} = React.useContext(SportContext);
    const closingModal = () => {
        setInProp(!inProp);
        setTimeout(() => {
            setInfo(false)
        },500)
    }
    console.log(show);
    return (
        <div className={`${show ==='entered' ? ' modal openModal' : 'closeModal'}`}>
        <button className='close-btn' onClick={closingModal}><GrClose /></button>
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