import { Navigate } from "react-router-dom";

const decodeToken = token => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(
      atob(parts[1])
    );

    return payload;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const localToken =
    localStorage.getItem(
      "taskflow-token"
    );

  const sessionToken =
    sessionStorage.getItem(
      "taskflow-token"
    );

  const token =
    localToken || sessionToken;

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const payload =
    decodeToken(token);

  if (!payload) {
    localStorage.removeItem(
      "taskflow-token"
    );

    sessionStorage.removeItem(
      "taskflow-token"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    payload.exp &&
    Date.now() > payload.exp
  ) {
    localStorage.removeItem(
      "taskflow-token"
    );

    sessionStorage.removeItem(
      "taskflow-token"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;