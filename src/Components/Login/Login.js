import './Login.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
// import useForm from '../useForm';

// import db from '../../firebase-config'
// import { ref, child, get } from "firebase/database";

const Login = ({fetchUser}) => {
    const onChangeFactory = setter => {
        return e => {
          setter(e.target.value);
        };
      };     

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(credentials) {
        console.log(credentials);
        const handleError = response => {
            if (!response.ok) { 
               throw Error(response.statusText);
            } else {
               return response.json();
            }
        }; 
        return fetch('http://localhost:8001/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          credentials: 'include',
          body: JSON.stringify(credentials)
        })
        .then(handleError)
        .then(data => {
            console.log("user", data);
            return data;
        })
        .catch(err => {
            console.error(err)
        }); 
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const res = await loginUser({
          username,
          password
        });
        console.log("eres", res);
        if (res.token == null) {
            console.log(res);
            // handle error login failed
        } else {
            fetchUser();
            navigate('/')
        }
      }
    // const navigate = useNavigate();
    // const onSubmit = (data) => {
    //     const dbRef = ref(db);
    //     get(child(dbRef, "users/"+ data['uname'])).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //             var user_data = snapshot.val();
    //             if (user_data['pwd'] === data['pwd'] && user_data['acnt'] === data['acnt']) {
    //                 alert('User Logged In!')
    //                 setUsername(data['uname']);
    //                 setAccType(data['acnt']);
    //                 if (data['acnt'] === 'Donor') {
    //                     setIsLoggedIn(true);
    //                     navigate('/user/donor');
    //                 } else if (data['acnt'] === 'Patient') {
    //                     setIsLoggedIn(true);
    //                     navigate('/user/patient');
    //                 } else {
    //                     setIsLoggedIn(true);
    //                     navigate('/user/admin');                                    
    //                 }
    //             } else {
    //                 alert('Username, account type or password not correct !!!');
    //             }
    //         } else {
    //             alert('Username doesn\'t exist !!!');
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }

    return( 
        <div className='login'>
            <h1>Sign In</h1>
            <div className='login-container'>
                <form className='login-card' name= "login-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="uname">Username</label>
                        <input type= "text" id="uname" name="uname" value={username}
                        onChange={onChangeFactory(setUsername)} />
                    </div>

                    <div>
                        <label htmlFor="pwd">Password</label>
                        <input type= "password" id="pwd" name="pwd" value={password} 
                        onChange={onChangeFactory(setPassword)} />
                        {/* onChange={handleChange}/> */}
                    </div>

                    <div className="button-wrap">
                        <input type = "submit" value = "Sign In" ></input>
                        {/* onClick= {handleSubmit}></input> */}
                        <input type = "reset" value = "Reset"></input>
                    </div>
                </form>   
            </div>
        </div>
    )
}

export default Login;