import Footer from '@/components/footer';
import Header from '@/components/header';
import Badge from '@/components/profile/Badge';
import BattleField from '@/components/profile/table/BattleField';
import CreateWriting from '@/components/profile/table/CreateWriting';

export default function Profile() {
  return (
    <div>
      <Header />
      <BattleField />
      <CreateWriting />
      <Badge tier={5} />
      <Footer />
    </div>
  );
}
