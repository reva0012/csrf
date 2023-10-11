import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({setSignedIn, signedIn, setUser}) =>  {

    const navigate = useNavigate();
    
    const onLogOut = () => {
        fetch('http://localhost:8001/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })
        .then(data => {
          if (data) {
            setUser({});
            setSignedIn(false);
          }
        });
        navigate('/');
    }

    return( 
    <div className='headerContainer'>
        <header>
            <NavLink to='/' exact="true"><h1 className="header_title">Bankist</h1></NavLink>
            <nav>
                <ul className="nav_links"> 
                {
                    !signedIn 
                    ? <li><NavLink className={'nav'} to='/login' exact="true">Sign In</NavLink></li> 
                    : <li><button className={'signout'} onClick={onLogOut}>Sign Out</button></li>
                }
                    {/* <li><NavLink to='/register' exact="true">Get Started</NavLink></li> */}
                </ul>
            </nav>
        </header>
    </div>
    )
}

export default Navbar;