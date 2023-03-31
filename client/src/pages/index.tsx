import { Spacer } from '@chakra-ui/react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/components/home/Layout';
import useUserProfile from '@/hooks/useUserProfile';

export default function Home() {
  useUserProfile();

  return (
    <>
      <Header />
      <HomeLayout />
      <Spacer />
      <Footer />
    </>
  );
}
