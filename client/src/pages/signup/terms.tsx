import AuthLayout from '@/components/common/AuthLayout';
import SignupTerms from '@/components/signup/Terms';

export default function SignupPage() {
  return (
    <AuthLayout title={'회원가입'}>
      <SignupTerms />
    </AuthLayout>
  );
}
