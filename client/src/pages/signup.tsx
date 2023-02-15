import { useState } from 'react';

import SignupForm from '../components/signup/Form';
import SignupLayout from '../components/signup/Layout';
import SignupTerms from '../components/signup/Terms';

export default function SignupPage() {
  const [agreeTerms, setAgreeTerms] = useState(false);

  return <SignupLayout>{agreeTerms ? <SignupForm /> : <SignupTerms setAgreeTerms={setAgreeTerms} />}</SignupLayout>;
}
