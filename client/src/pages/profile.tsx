import Footer from '@/components/footer';
import Header from '@/components/header';
import Badge from '@/components/profile/Badge';

export default function Profile() {
  return (
    <div>
      <Header />

      <Badge tier={5} />
      <Footer />
    </div>
  );
}
