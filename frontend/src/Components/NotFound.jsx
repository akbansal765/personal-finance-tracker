import { useRouteError, Link } from "react-router-dom";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          {error?.error?.message || "Sorry, the page you're looking for doesn't exist."}
        </p>
        <Link to="/dashboard" className="home-button">← Back to Homepage</Link>
      </div>
    </div>
  );
}

export default NotFound;
