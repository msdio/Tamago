import Alert from '@/components/common/Alert';

interface PrepareAlertProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function PrepareAlert({ isOpen, onClose }: PrepareAlertProps) {
  return <Alert header='준비중인 기능입니다.' isOpen={isOpen} onClose={onClose} />;
}
