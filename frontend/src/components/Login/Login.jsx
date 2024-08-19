
import './Login.css'
const Login = () => {
  return (
    <>
        <div className='Login'>
            <div className="right-container">
                <h1>Login</h1>
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />

                <button className="login-btn1">Login</button>

                <p>Dont have an account? <a href="Signup">  Signup</a></p>

            </div>

            <div className="left-container">
             <div className="contain">

             </div>

            </div>

        
      
        </div>
    </>

  )
}

export default Login
