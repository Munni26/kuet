import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';




const Form = () => {

    const [halData, setHalData] = useContext(UserContext);
    
    const [bio, setBio] = useState({
        name: '',
        email: '',
        dept: '',
        roll: '',
        fatherName: '',
        motherName: '',
        semester: '',
        cg: ''
    })



    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value);
        setBio([e.target.name] = e.target.value);
    }

    return (
        <div className="container">


            <div className="row">
                <div className="col-md-6 mt-5 pt-5">

                    <img className="img-fluid" alt="" src={require(`../../images/All Pic/${halData.pic}`).default} />

                    <h2 className="text-primary">{halData.name}</h2>



                </div>
                <div className="col-md-6">
                
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="name" className="form-control" type="text" placeholder="Enter Your Name" />
                        <br />

                        <input onChange={handleChange} name="email" className="form-control" type="email" placeholder="Enter your email" />
                        <br />

                        <input onChange={() => handleChange} name="dept" className="form-control" type="text" placeholder="Enter Your Department" />
                        <br />

                        <input onChange={() => handleChange} name="roll" className="form-control" type="number" placeholder="Enter Roll" />
                        <br />

                        <input onChange={() => handleChange} name="fatherName" className="form-control" type="text" placeholder="Enter Father's Name" />
                        <br />

                        <input onChange={() => handleChange} name="motherName" className="form-control" type="text" placeholder="Enter Mother's Name" />
                        <br />

                        <input onChange={() => handleChange} name="semester" className="form-control" type="text" placeholder="Enter  your year and semester" />
                        <br />

                        <input onChange={() => handleChange} name="cg" className="form-control" type="number" placeholder="Enter CG " />
                        <br />
                        
                        <button className="btn btn-success form-control">Submit</button>
                    </form>


                </div>

            </div>
        </div>
    );
};

export default Form;