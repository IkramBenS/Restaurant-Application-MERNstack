import React, { useState, useEffect }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import {showErrorMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';
import {setAuthentication, isAuthenticated} from '../helpers/auth';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../api/auth'

const Signin = () => {
    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard');
        }
    }, [history])
    const[formData, setFormData] = useState(  {
        email : 'ikrambenselma@gmail.com',
        password : '123111',
        errorMsg :false,
        loading : false,

    });

    const {
        email,
        password,
        errorMsg,
        loading,
        } =formData;


/*******************************************
 *EVENT HANDLE 
 *******************************************/


 const handleChange = (evt) => {   
    setFormData({ /*we used setFormData to change the state*/
        ...formData, /* Current formData */
        [evt.target.name] : evt.target.value,
        errorMsg : '', //remove errorMsg while writing
    });
};


    const handleSubmit = (evt) =>{
        evt.preventDefault();


        //client-side validation
        if (
            isEmpty(email) || 
            isEmpty(password)
            ) {
            setFormData({
                 ...formData, errorMsg: 'All fields are required',
            });    
        } else if (!isEmail(email)){
            setFormData({
                ...formData, errorMsg: 'Invalid email',
            });
        }else {
            const { email, password } = formData; //from formData we need username, email,password
            const data = { email, password };  //store the object in variable called data          
            setFormData({...formData, loading : true});

            signin(data)
                .then((response) => {
                    setAuthentication(response.data.token, response.data.user);

                    if (isAuthenticated() && isAuthenticated().role === 1) {
                        console.log('Redirecting to admin dashboard');
                        history.push('/admin/dashboard');
                    } else {
                        console.log('Redirecting to user dashboard');
                        history.push('/user/dashboard');
                    }
                })
                .catch((err) => {
                    console.log('singnin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });
               
        }
    };
/*******************************************
 *VIEWS
 *******************************************/
 const showSigninForm = () => (
    <form className='signin-form' onSubmit= {handleSubmit} noValidate>
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
    
        {/* signin button */}
        <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block  '>
                Signin
            </button>
        </div>

        {/* already have account */}
        <p className='text-center text-white'>
            Don"t have an account? <Link to='/signup'>Register here</Link>
        </p>
</form>
);       

/********************************************* RENDER ********************************************/

    return (       
        <div className='signin-container '> 
            <div className='row px-2 vh-100'> 
                <div className='forum_inputs-in'> 
                        <p className='welcome'>
                            WELCOME !
                        </p>
                    {errorMsg && showErrorMsg(errorMsg)} 
                    {loading && <div className='text-center'> {showLoading()}</div> } 
                    {showSigninForm()}
            
            </div> 
        </div>       
    </div>
);

};
export default Signin;