import type { TierLevels } from '@/types/tier';

interface TierInfoProps {
  level: TierLevels['level'];
  text: string;
  label: string;
}

export const tierInfo: TierInfoProps[] = [
  {
    level: 0,
    text: 'GUEST',
    label: '깃털',
  },
  {
    level: 1,
    text: 'Lv.1',
    label: '달걀',
  },
  {
    level: 2,
    text: 'Lv.2',
    label: '갓 난 병아리',
  },
  {
    level: 3,
    text: 'Lv.3',
    label: '병아리',
  },
  {
    level: 4,
    text: 'Lv.4',
    label: '청소년 병아리',
  },
  {
    level: 5,
    text: 'Lv.5',
    label: '위풍당당한 닭',
  },
];
