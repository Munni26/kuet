import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import Data from '../Data/Data';


import './Hall.css'
const Hall = () => {
    const [data, setData] = useState(Data)
    const [halData, setHalData] = useContext(UserContext);

    //const history=useHistory();
    //  const handleSpecificHall=(i)=>{
    // history.push(`/form/${data}`)
    // }

    //  useEffect(()=>{
    //     fetch('http://localhost:4000/datas')
    //     .then(res=>res.json())
    //     .then(result=>{
    //         setData(result)
    //     })
    //  },[])


    return (
        <div className="container">

            {
                data.map(data => {
                    return (
                        <div className="row">
                            <div className="col-md-8 m-auto mt-5">
                                <h2 className="text-success">Hall-Name: {data.name}</h2>
                                <img className="img-fluid" alt="" src={require(`../../images/All Pic/${data.pic}`).default} />

                                <Link to={`/form/${data.name}`}>
                                    <button onClick={() => setHalData(data)} className="btn btn-primary">Book Now</button>
                                </Link>

                            </div>
                        </div>
                    )



                })
            }


        </div>
    );
};

export default Hall;