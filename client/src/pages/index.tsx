import { Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/components/home/Layout';
import useUserProfile from '@/hooks/useUserProfile';

export default function Home() {
  const router = useRouter();
  useUserProfile(router.asPath);

  return (
    <>
      <Header />
      <HomeLayout />
      <Spacer />
      <Footer />
    </>
  );
}
