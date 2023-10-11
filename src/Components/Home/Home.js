import './Home.css'
import bank from './background.jpg'


const Home = () => {

    return (
        <div className='land-container'>
            <div className='card'>
                <p className='title'>The Bank <br />that does <br />it all.</p>
            </div>
            <div className='card'>
                <img src={bank} alt="bank" height='500px'/>
            </div>
        </div>
    )
}

export default Home;

