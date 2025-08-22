import { Navigate } from 'react-router';
import { isTokenValid } from '../utils/auth';

function ProtectedRoute({ children }) {
  if (!isTokenValid()) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default ProtectedRoute;
