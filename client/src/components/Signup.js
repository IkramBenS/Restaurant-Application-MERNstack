import React, {useState} from 'react';
import './signup.css';
import {Link} from 'react-router-dom';
//importation from the package validator what we need :
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import {showErrorMsg, showSuccessMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';



const Signup = () => {
     {/* setFormData c la méthode utilisée pour faire les changements des données for our component state
    formData : objets contenant les données username,email... */ }
    const[formData, setFormData] = useState(  {
        username : 'ikram',
        email : 'ikrambs@gmail.com',
        password : '123',
        password2 : '123',
        successMsg: false,
        errorMsg :false,
        loading : false

    })

    {/*distructure state */}
    const {
        username,
        email,
        password,
        password2,
        successMsg,
        errorMsg,
        loading} =formData;

/*******************************************
 *EVENT HANDLE 
 *******************************************/


    const handleChange = (evt) => {   
        setFormData({ /*we used setFormData to change the state*/
            ...formData, /* Current formData */
            [evt.target.name] : evt.target.value,
            successMsg : '', //remove successMsg while writing
            errorMsg : '', //remove errorMsg while writing
        });
    };

        //this is where we gonna start making our http request,and take the info provided by the user , stored in the state to the server
    const handleSubmit = (evt) =>{
        evt.preventDefault();

    //client-side validation
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2) ){
        setFormData({
            ...formData, errorMsg: 'All fields are required'
        });    
    } else if (!isEmail(email)){
        setFormData({
            ...formData, errorMsg: 'Invalid email'
        });
    }else if(!equals(password,password2)) {
        setFormData({
            ...formData, errorMsg: 'Passwords do not match'
        });
    }else {
        const { username, email, password } = formData; //from formData we need username, email,password
        const data = { username, email, password };  //store the object in variable called data
        
        
        setFormData({...formData, loading : true});
        signup(data)
    }

};

/*******************************************
 *VIEWS
 *******************************************/
        const showSignupForm = () => (
            <form className='signup-form' onSubmit= {handleSubmit} noValidate>
                {/* username */ }
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-user'></i>
                        </span>
                </div>
                <input
                    name='username'
                    value={username}
                    className='form-controll'
                    placeholder='Username'
                    type='text'
                    class='form-control'
                    aria-describedby="basic-addon3"
                   

                    onChange = {handleChange}    /* Listening for changes in input fields */  /* handleChange : ca veut dire, quand le user commence à taper */
                />
                </div>
            {/* email */}
            <div className='form-group input-group'>
                <div className=' input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
            
                <input
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    onChange = {handleChange}

                />
            </div>
            {/* password */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    onChange = {handleChange}
                />
            </div>
            {/* password2 */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password2'
                    value={password2}
                    className='form-control'
                    placeholder='Confirm password'
                    type='password'
                    onChange = {handleChange}
                />
            </div>
                {/* signup button */}
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-block  '>
                        Signup
                    </button>
                </div>

                {/* already have account */}
                <p className='text-center text-white'>
                    Have an account? <Link to='/signin'>Log In</Link>
                </p>
        </form>
);
/********************************************* RENDER ********************************************/

return (
    <div className='signup-container'>      
        <div className='row px-3 vh-100'> {/* vh : view heigth pour rendre le background sur la totalité de la page */}
            {/* align-self-center: bootstrap4 , c pour deplacer le bloc signup dans le centre*/}
            <div className='col-md-5 mx-auto align-self-center'> 
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)} {/*if error msg is true then execute the methode showErrorMsg */}
                {loading && <div className='text-center'> {showLoading()}</div> } {/* if loading then show loading*/}
                {showSignupForm()}
                {/* Event handle to on chage events of input fields: */}
                {/*<p style={{color: 'black'}}>{JSON.stringify (formData)}</p> {/* To see in real time that the information stored in our component state changes */}
            
            </div> 
        </div>       
    </div>
);

};
export default Signup;