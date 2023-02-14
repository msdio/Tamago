import { useState } from 'react';

import AuthLayout from '@/component/common/AuthLayout';

import SignupForm from '../components/signup/Form';
import SignupTerms from '../components/signup/Terms';

export default function SignupPage() {
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <AuthLayout title={'회원가입'}>
      {agreeTerms ? <SignupForm /> : <SignupTerms setAgreeTerms={setAgreeTerms} />}
    </AuthLayout>
  );
}
