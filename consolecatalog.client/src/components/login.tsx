import { useState } from "react";
import "../styling/login.css";
import Background from "./background";
import { useNavigate } from "react-router-dom";

enum ActiveTab {
  SignIn,
  SignUp,
}

interface LoginDetails {
  username: string | null;
  password: string | null;
}

interface RegisterDetails {
  username: string | null;
  playstationGamtertag: string | null;
  xboxGamertag: string | null;
  password: string | null;
}

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.SignIn);
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: null,
    password: null,
  });

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    username: null,
    playstationGamtertag: null,
    xboxGamertag: null,
    password: null,
  });

  const loginDetailsPopulated =
    loginDetails.username !== null &&
    loginDetails.username !== "" &&
    loginDetails.password !== null &&
    loginDetails.password !== "";

  const registerDetailsPopulated =
    registerDetails.username !== null &&
    registerDetails.username !== "" &&
    registerDetails.password !== null &&
    registerDetails.password !== "";

  const loginUser = () => {
    navigate("/1")
  };

  const registerUser = () => {
    navigate("/1")
  };

  return (
    <>
      <Background />
      <div className="login-container">
        <div className="form-buttons">
          <div
            className={`form-button ${
              activeTab === ActiveTab.SignIn ? "active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.SignIn)}
          >
            Sign In
          </div>
          <div
            className={`form-button ${
              activeTab === ActiveTab.SignUp ? "active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.SignUp)}
          >
            Sign Up
          </div>
        </div>
        {activeTab === ActiveTab.SignIn ? (
          <div className="login-form">
            <h1 className="login-form-title">Welcome Back</h1>

            <div className="login-form-content">
              <label>Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
                required
              ></input>

              <label>Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                required
              ></input>

              <button onClick={loginUser} disabled={!loginDetailsPopulated}>
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <div className="login-form">
            <h1 className="register-form-title">Create Account</h1>
            <p className="help-text">An * denotes a required field</p>
            <form className="login-form-content">
              <label>Username: *</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    username: e.target.value,
                  })
                }
                required
              ></input>

              <label>Playstation Gamertag:</label>
              <input
                id="psgamertag"
                name="psgamertag"
                type="text"
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    playstationGamtertag: e.target.value,
                  })
                }
              ></input>

              <label>Xbox Gamertag:</label>
              <input
                id="xboxgamertag"
                name="xboxgamertag"
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    xboxGamertag: e.target.value,
                  })
                }
                type="text"
              ></input>

              <label>Password: *</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) =>
                  setRegisterDetails({
                    ...registerDetails,
                    password: e.target.value,
                  })
                }
                required
              ></input>

              <button
                onClick={registerUser}
                disabled={!registerDetailsPopulated}
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
