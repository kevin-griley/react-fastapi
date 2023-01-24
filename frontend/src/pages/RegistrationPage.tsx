import Body from '../components/Body';
import { RegisterForm } from '../components/registerForm';


export function RegistrationPage() {
  
  return (
    <Body showSidebar={false} >
        <RegisterForm />
    </Body>
  );
}