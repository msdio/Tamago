import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { loginAPI } from '@/apis/auth';
import { userProfileState } from '@/atoms/userProfile';
import AuthLayout from '@/components/common/AuthLayout';
import type { InputType } from '@/components/login/Form';
import LoginForm from '@/components/login/Form';
import { MAIN_PATH } from '@/constants/paths';
import { SUCCESS } from '@/constants/responseCode';
import type { ApiErrorResponse } from '@/types/apiResponse';
import type { UserProfile } from '@/types/user';

function Login() {
  const router = useRouter();
  const setUserProfile = useSetRecoilState(userProfileState);

  const genTempData = (nickname: string): UserProfile => {
    const data = {
      email: 'temp',
      introduce: 'temp',
      nickname,
      profileImg: 'temp',
      provider: 'temp',
      terms: true,
    };

    return data;
  };

  const onSuccessLogin = (data: UserProfile) => {
    setUserProfile(data);
    router.push(MAIN_PATH);
  };

  const handleLogin = async ({ email, password }: InputType) => {
    try {
      const data = await loginAPI({ email, password });

      if (data.code === SUCCESS) {
        const temp = genTempData(data.result.nickname);
        onSuccessLogin(temp);
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
