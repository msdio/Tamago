import Footer from '@/components/footer';
import Header from '@/components/header';
import Badge from '@/components/profile/Badge';
import BattleField from '@/components/profile/table/BattleField';
import CreateWriting from '@/components/profile/table/CreateWriting';
import TierTrend from '@/components/profile/TierTrend';
import TypingStatistic from '@/components/profile/TypingStatistic';

export default function Profile() {
  return (
    <div>
      <Header />
      <BattleField />
      <CreateWriting />
      <Badge tier={5} />
      <TierTrend />
      <TypingStatistic />
      <Footer />
    </div>
  );
}
