import { MouseEvent, useEffect, useState } from "react";
import "../styling/login.css";
import Background from "./site/background";
import { useNavigate } from "react-router-dom";
import {
  FormError,
  LoginDetails,
  RegisterDetails,
  User,
} from "../functions/interfaces";
import {
  validateUserLogin,
  validateUserRegistrationPassword,
} from "../functions/validation";
import { getUserByUsername, putUser } from "../functions/server";
import { useSetRecoilState } from "recoil";
import { userState } from "../functions/state";
import { ActiveLoginTab } from "../functions/enums";
import Conditional from "./site/if-then-else";

function Login() {
  useEffect(() => {
    function resetUser() {
      setUser({} as User);
    }
    resetUser();
  }, []);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveLoginTab>(
    ActiveLoginTab.SignIn
  );
  const setUser = useSetRecoilState(userState);
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: null,
    password: null,
  });
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    username: null,
    playstationGamertag: null,
    xboxGamertag: null,
    password: null,
    confirm_password: null,
  });
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);
  const [registerUsernameError, setRegisterUsernameError] = useState("");
  const [registerPasswordError, setRegisterPasswordError] = useState("");
  const [registerConfirmPasswordError, setRegisterConfirmPasswordError] =
    useState("");

  const loginDetailsPopulated =
    loginDetails.username !== null &&
    loginDetails.username !== "" &&
    loginDetails.password !== null &&
    loginDetails.password !== "";

  const registerDetailsPopulated =
    registerDetails.username !== null &&
    registerDetails.username !== "" &&
    registerDetails.password !== null &&
    registerDetails.password !== "" &&
    registerDetails.confirm_password !== null &&
    registerDetails.confirm_password !== "";

  const loginUser = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    const user = await getUserByUsername(loginDetails.username);
    if (validateUserLogin(user, loginDetails)) {
      setUser(user);
      setShowLoginErrorMessage(false);
      navigate(`/${user.id}`);
    } else {
      setShowLoginErrorMessage(true);
    }
  };

  const registerUser = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    resetErrors();

    var registrationErrors = validateUserRegistrationPassword(
      registerDetails
    ) as FormError[];

    if (registrationErrors.length === 0) {
      try {
        const user = await putUser(registerDetails);
        setUser(user);
        navigate(`/${user.id}`);
      } catch (error) {
        setRegisterUsernameError("Username already exists");
      }
    } else {
      registrationErrors.forEach((error) => {
        if (error.field === "password") setRegisterPasswordError(error.message);
        else if (error.field === "confirm_password")
          setRegisterConfirmPasswordError(error.message);
      });
    }
  };

  function resetErrors() {
    setRegisterUsernameError("");
    setRegisterPasswordError("");
    setRegisterConfirmPasswordError("");
  }

  return (
    <>
      <Background />
      <div className="login-container">
        <div className="form-buttons">
          <div
            className={`form-button ${Conditional({
              Condition: activeTab === ActiveLoginTab.SignIn,
              If: "active",
            })}`}
            onClick={() => setActiveTab(ActiveLoginTab.SignIn)}
          >
            Sign In
          </div>
          <div
            className={`form-button ${Conditional({
              Condition: activeTab === ActiveLoginTab.SignUp,
              If: "active",
            })}`}
            onClick={() => setActiveTab(ActiveLoginTab.SignUp)}
          >
            Sign Up
          </div>
        </div>
        <Conditional
          Condition={activeTab === ActiveLoginTab.SignIn}
          If={
            <div className="login-form">
              <h1 className="login-form-title">Welcome Back</h1>
              <Conditional
                Condition={showLoginErrorMessage}
                If={
                  <p className="help-text error">
                    Username or Passwrod is incorrect
                  </p>
                }
              />
              <div className="login-form-content">
                <div className="text">
                  <label>Username:</label>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      username: e.target.value,
                    })
                  }
                  required
                ></input>

                <div className="text">
                  <label>Password:</label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                  required
                ></input>

                <button
                  type="submit"
                  onClick={(event) => loginUser(event)}
                  disabled={!loginDetailsPopulated}
                >
                  Sign In
                </button>
              </div>
            </div>
          }
          Else={
            <div className="login-form">
              <h1 className="login-form-title">Create Account</h1>
              <p className="help-text">An * denotes a required field</p>
              <div className="login-form-content">
                <div className="text">
                  <label>Username: *</label>
                  <p className="error-text">{registerUsernameError}</p>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      username: e.target.value,
                    })
                  }
                  required
                ></input>

                <div className="text">
                  <label>Playstation Gamertag:</label>
                </div>
                <input
                  id="psgamertag"
                  name="psgamertag"
                  type="text"
                  autoComplete="off"
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      playstationGamertag: e.target.value,
                    })
                  }
                ></input>
                <div className="text">
                  <label>Xbox Gamertag:</label>
                </div>
                <input
                  id="xboxgamertag"
                  name="xboxgamertag"
                  type="text"
                  autoComplete="off"
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      xboxGamertag: e.target.value,
                    })
                  }
                ></input>

                <div className="text">
                  <label>Password: *</label>
                  <p className="error-text">{registerPasswordError}</p>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      password: e.target.value,
                    })
                  }
                  required
                ></input>

                <div className="text">
                  <label>Confirm Password: *</label>
                  <p className="error-text">{registerConfirmPasswordError}</p>
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      confirm_password: e.target.value,
                    })
                  }
                  required
                ></input>

                <button
                  type="submit"
                  onClick={(event) => registerUser(event)}
                  disabled={!registerDetailsPopulated}
                >
                  Sign Up
                </button>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

export default Login;
