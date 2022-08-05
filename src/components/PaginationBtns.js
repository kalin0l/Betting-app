import React from "react";
import { SportContext } from "../context/context";


const PaginationBtns = () => {

    const {isClicked,page,mainEvents,setPage} = React.useContext(SportContext);
    
    const onHandlePage = (i) => {
        setPage(i)
    }
    // pagination functionality
    const nextPage = () => {
        setPage((oldPage) => {
            let newPage = oldPage + 1
            if (newPage > mainEvents.length - 1) {
                newPage = 0
            }
            return newPage
        })
    }

    const prevPage = () => {
        setPage((oldPage) => {
            let newPage = oldPage - 1
            if (newPage < 0) {
                newPage = mainEvents.length - 1
            }
            return newPage
        })
    }

    return <>
 {!isClicked && <div className='pagination-container'>
                <button type='button' className='prev-btn' onClick={prevPage}>Prev</button>
                {mainEvents && mainEvents.map((_, index) => {
                    return <button key={index} className={`${index === page ? 'activePage' : null}`} onClick={() => onHandlePage(index)}>{index + 1}</button>
                })}
                <button type='button' className='next-btn' onClick={nextPage}>Next</button>
            </div>}
    </>
}

export default PaginationBtns