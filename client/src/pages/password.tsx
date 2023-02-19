import { useState } from 'react';

import PasswordChange from '@/components/password/change';
import PasswordChangeComplete from '@/components/password/complete';
import InquiryPw from '@/components/password/index/index';

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
