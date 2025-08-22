import { Link } from 'react-router';

function ErrorPage() {
  return (
    <div className="text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Oh, Something happend!</h1>
      <p>Uh, I guess you dont have anything to show yet on Error Page?</p>
      <div className="text-center btn-group">
        <Link
          className="text-decoration-none btn btn-primary btn-sm"
          to="/home"
        >
          Home
        </Link>
        <Link
          className="text-decoration-none btn btn-primary btn-sm"
          to="/about"
        >
          About
        </Link>
        <Link
          className="text-decoration-none btn btn-primary btn-sm"
          to="/demo"
        >
          Demo
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
