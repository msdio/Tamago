import AuthLayout from '@/components/common/AuthLayout';
import SignupForm from '@/components/signup/Form';

export default function SignupPage() {
  return (
    <AuthLayout title={'회원가입'}>
      <SignupForm />
    </AuthLayout>
  );
}
