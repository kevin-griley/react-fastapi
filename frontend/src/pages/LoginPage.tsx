import Body from '../components/Body';
import { LoginForm } from '../components/loginForm';


export function LoginPage() {
  
  return (
    <Body showSidebar={false} >
      <LoginForm />
    </Body>
  );
}