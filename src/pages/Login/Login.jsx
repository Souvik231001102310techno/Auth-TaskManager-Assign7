import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const createJwtSimulation = username => {
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  );

  const payload = btoa(
    JSON.stringify({
      username,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000
    })
  );

  const signature = btoa(
    `${username}-${Date.now()}`
  );

  return `${header}.${payload}.${signature}`;
};

const getPasswordStrength = password => {
  if (!password) {
    return {
      text: "",
      level: 0
    };
  }

  let score = 0;

  if (password.length >= 6) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  if (score <= 1) {
    return {
      text: "Weak",
      level: 1
    };
  }

  if (score <= 3) {
    return {
      text: "Medium",
      level: 2
    };
  }

  return {
    text: "Strong",
    level: 3
  };
};

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState(
      localStorage.getItem(
        "taskflow-remembered-user"
      ) || ""
    );

  const [password, setPassword] =
    useState("");

  const [rememberUser, setRememberUser] =
    useState(
      Boolean(
        localStorage.getItem(
          "taskflow-remembered-user"
        )
      )
    );

  const [errors, setErrors] =
    useState({});

  const [loginError, setLoginError] =
    useState("");

  const passwordStrength =
    getPasswordStrength(password);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "taskflow-token"
      ) ||
      sessionStorage.getItem(
        "taskflow-token"
      );

    if (token) {
      navigate("/dashboard", {
        replace: true
      });
    }
  }, [navigate]);

  const handleLogin = event => {
    event.preventDefault();

    const newErrors = {};

    if (!username.trim()) {
      newErrors.username =
        "Username is required.";
    }

    if (!password) {
      newErrors.password =
        "Password is required.";
    }

    setErrors(newErrors);
    setLoginError("");

    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }

    const token =
      createJwtSimulation(
        username.trim()
      );

    if (rememberUser) {
      localStorage.setItem(
        "taskflow-token",
        token
      );

      localStorage.setItem(
        "taskflow-remembered-user",
        username.trim()
      );

      sessionStorage.removeItem(
        "taskflow-token"
      );
    } else {
      sessionStorage.setItem(
        "taskflow-token",
        token
      );

      localStorage.removeItem(
        "taskflow-token"
      );

      localStorage.removeItem(
        "taskflow-remembered-user"
      );
    }

    localStorage.setItem(
      "taskflow-current-user",
      username.trim()
    );

    navigate("/dashboard");
  };

  const handleUsernameChange =
    event => {
      setUsername(
        event.target.value
      );

      setErrors(previous => ({
        ...previous,
        username: ""
      }));

      setLoginError("");
    };

  const handlePasswordChange =
    event => {
      setPassword(
        event.target.value
      );

      setErrors(previous => ({
        ...previous,
        password: ""
      }));

      setLoginError("");
    };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          T
        </div>

        <span className="login-label">
          TASKFLOW
        </span>

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to access your protected
          task dashboard.
        </p>

        {loginError && (
          <div className="login-error">
            <span>!</span>

            <p>
              {loginError}
            </p>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          noValidate
        >
          <label>
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={
              handleUsernameChange
            }
            placeholder="Enter username"
            autoComplete="username"
            className={
              errors.username
                ? "input-error"
                : ""
            }
          />

          {errors.username && (
            <span className="field-error">
              {errors.username}
            </span>
          )}

          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={
              handlePasswordChange
            }
            placeholder="Enter password"
            autoComplete="current-password"
            className={
              errors.password
                ? "input-error"
                : ""
            }
          />

          {errors.password && (
            <span className="field-error">
              {errors.password}
            </span>
          )}

          {password && (
            <div className="password-strength">
              <div className="strength-top">
                <span>
                  Password Strength
                </span>

                <strong
                  className={`strength-${passwordStrength.text.toLowerCase()}`}
                >
                  {passwordStrength.text}
                </strong>
              </div>

              <div className="strength-bars">
                <span
                  className={
                    passwordStrength.level >= 1
                      ? `active ${passwordStrength.text.toLowerCase()}`
                      : ""
                  }
                />

                <span
                  className={
                    passwordStrength.level >= 2
                      ? `active ${passwordStrength.text.toLowerCase()}`
                      : ""
                  }
                />

                <span
                  className={
                    passwordStrength.level >= 3
                      ? `active ${passwordStrength.text.toLowerCase()}`
                      : ""
                  }
                />
              </div>
            </div>
          )}

          <label className="remember-user">
            <input
              type="checkbox"
              checked={rememberUser}
              onChange={event =>
                setRememberUser(
                  event.target.checked
                )
              }
            />

            <span>
              Remember User
            </span>
          </label>

          <button type="submit">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;