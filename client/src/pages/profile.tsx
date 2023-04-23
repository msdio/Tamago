import Footer from '@/components/footer';
import Header from '@/components/header';
import Badge from '@/components/profile/Badge';
import BattleField from '@/components/profile/table/BattleField';

export default function Profile() {
  return (
    <div>
      <Header />
      <BattleField />
      <Badge tier={5} />
      <Footer />
    </div>
  );
}
