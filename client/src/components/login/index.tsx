import AuthLayout from '@/components/common/AuthLayout';
import LoginForm from '@/components/login/Form';

function Login() {
  return (
    <AuthLayout title={'로그인'}>
      <LoginForm />
    </AuthLayout>
  );
}
export default Login;
