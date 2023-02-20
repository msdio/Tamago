import { useRouter } from 'next/router';

import { loginAPI } from '@/apis/auth';
import AuthLayout from '@/components/common/AuthLayout';
import LoginForm from '@/components/login/Form';
import { MAIN_PATH } from '@/utils/paths';

function Login() {
  const router = useRouter();
  const handleLogin = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await loginAPI(email, password);
      // TODO: accessToken 처리 이야기 후, 수정
      router.push(MAIN_PATH);
    } catch (error) {
      // TODO : error handling 방식 논의후 정리
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <AuthLayout title={'로그인'}>
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
}
export default Login;
