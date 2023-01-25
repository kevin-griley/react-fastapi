import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export type PublicRouteProps = {
  children: JSX.Element | JSX.Element[];
} 

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useUser();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return <Navigate to="/" />
  }
  else {
    return children;
  }
}