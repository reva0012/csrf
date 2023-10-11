import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = ({user}) =>  {
    const navigate = useNavigate();

    const onMakeTransfer = () => {
        navigate('/maketransfer');
    }

    return( 
        <div className='details_con'>
            <div className='det'>
                <h3>Hello, { user.username }</h3>
                <p>Your Account balance is &#x20b9; { user.money } </p>
            </div>
            <div className='content'>
                <div className='trtable'>
                    <h2>Transactions</h2>
                    <table id='transaction'>
                        <thead>
                            <tr>
                                <th>Amount ( &#x20b9;)</th>
                                <th>To</th>
                                <th>Description</th>
                                <th>Balance (&#x20b9;)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user['transfers'].reverse().map((val, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{val['amount']}</td>
                                            <td>{val['to']}</td>
                                            <td>{val['description']}</td>
                                            <td>{val['balance']}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='make-trans'>
                <input type="button" onClick={onMakeTransfer} value="Make transfer" />
            </div>
        </div>
    )
}

export default LandingPage;