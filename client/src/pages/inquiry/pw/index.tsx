import { useState } from 'react';

import PasswordChange from '@/components/inquiryPw/change';
import PasswordChangeComplete from '@/components/inquiryPw/complete';
import InquiryPw from '@/components/inquiryPw/index';

type InquiryStatusType = 'init' | 'complete' | 'change';

function FindPasswordPage() {
  const [status, setStatus] = useState<InquiryStatusType>('init');

  switch (status) {
    case 'init':
      return <InquiryPw handleNextStep={() => setStatus('change')} />;
    case 'change':
      return <PasswordChange handleNextStep={() => setStatus('complete')} />;
    case 'complete':
      return <PasswordChangeComplete />;
    default:
      break;
  }
}
export default FindPasswordPage;
