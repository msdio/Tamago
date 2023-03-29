import HomeLayout from '@/components/home/Layout';
import useUserProfile from '@/hooks/useUserProfile';

export default function Home() {
  useUserProfile();

  return <HomeLayout />;
}
