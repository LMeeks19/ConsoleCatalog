import "../styling/login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-form-title">Welcome Back</h1>

        <form className="login-form-content">
          <label>Username:</label>
          <input type="text"></input>

          <label>Password:</label>
          <input type="password"></input>

          <input type="submit" value="Login"></input>
        </form>

        <div className="login-form-footer">
          Not Registered? <a>Create Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
