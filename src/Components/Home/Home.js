import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Kuet from '../../images/All Pic/kuet.jpg'
import Data from '../Data/Data';
import './Home.css'
const Home = () => {
    const [data,setData]=useState(Data)

   

    const history=useHistory();
    const handleHal=(dat)=>{
        history.push('/hal')
        
    //     fetch("http://localhost:4000/allData",{
    //         method:'POST',
    //         headers:{'Content-Type':'application/json'},
    //          body:JSON.stringify(dat)
    
    // })
    
        
    }
    return (
        
        <section className="Home">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mt-5 pt-5">
                    <p className="text-light text-center">Welcome to KUET
                    Khulna University of Engineering  Technology (KUET) is one of the leading public universities of Bangladesh giving special emphasis in the Engineering and Technological Education</p>
                    <h3 className="text-light">Are You Looking For a seat in Hall??</h3>
                    <button onClick={()=>handleHal(data)} className="btn btn-primary">Click For Booking</button>
                </div>

                <div className="col-md-8 mt-5 pt-5">

                    <img className="img-fluid" src={Kuet} alt=""/>
                </div>
            </div>
            
        </div>
        </section>
    );
};

export default Home;