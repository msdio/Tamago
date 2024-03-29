import { useRouter } from 'next/router';

import { loginAPI } from '@/apis/auth';
import AuthLayout from '@/components/common/AuthLayout';
import type { InputType } from '@/components/login/Form';
import LoginForm from '@/components/login/Form';
import { MAIN_PATH } from '@/constants/paths';
import { RESPONSE_CODE } from '@/constants/responseCode';
import type { ApiErrorResponse } from '@/types/apiResponse';

function Login() {
  const router = useRouter();

  const onSuccessLogin = () => {
    router.push(MAIN_PATH);
  };

  const handleLogin = async ({ email, password }: InputType) => {
    try {
      const data = await loginAPI({ email, password });

      if (data.code === RESPONSE_CODE.SUCCESS) {
        onSuccessLogin();
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      const customError = error as ApiErrorResponse;

      alert(customError.description);
    }
  };

  return (
    <AuthLayout title='로그인'>
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
}
export default Login;
