import React,{useEffect} from 'react';
import Main from '../components/Main/Main'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import { SportContext } from "../context/context";
import { AuthContext } from '../context/authContext';


const Home = () => {
    const { info,dispatch,isDepositClicked} = React.useContext(SportContext);
    const { user} = React.useContext(AuthContext);
    useEffect(() => {
      const getAllDeposits = async (user) => {
        try {
          const res = await fetch(`api/v1/${user.userId}`);
          const data = await res.json();
          
          dispatch({type:'DEPOSIT',payload:data.docs});
        } catch (error) {
          console.log(error);
          
        }
      }
      getAllDeposits(user);
    },[dispatch,user,isDepositClicked])
   

    return <>
        <section className={`${info ? 'section-grid shadow' : 'section-grid'}`}>
            <Header />
            <Main />
            <Aside />
            <Footer />
        </section>
    </>
}
export default Home;