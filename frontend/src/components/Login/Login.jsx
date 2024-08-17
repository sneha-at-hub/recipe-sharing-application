
import './Login.css'
const Login = () => {
  return (
    <>
        <div className='Login'>
            <div className="right-container">
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />

                <button className="login-btn">Login</button>

                <p>Dont Have an account?<a href="Signup">Signup</a></p>

            </div>

            <div className="left-container">

            </div>

        
      
        </div>
    </>

  )
}

export default Login
