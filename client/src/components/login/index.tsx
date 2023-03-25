import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { getUserProfile, loginAPI } from '@/apis/auth';
import { userProfileState } from '@/atom/userProfile';
import AuthLayout from '@/components/common/AuthLayout';
import type { InputType } from '@/components/login/Form';
import LoginForm from '@/components/login/Form';
import { MAIN_PATH } from '@/utils/paths';

function Login() {
  const router = useRouter();
  const setUserProfile = useSetRecoilState(userProfileState);

  const handleLogin = async ({ email, password }: InputType) => {
    try {
      await loginAPI(email, password);

      const userProfile = await getUserProfile();
      setUserProfile(userProfile);

      router.push(MAIN_PATH);
    } catch (error) {
      // TODO : error handling 방식 논의후 정리
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <AuthLayout title='로그인'>
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
}
export default Login;
