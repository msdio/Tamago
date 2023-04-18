import { Spacer } from '@chakra-ui/react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/components/home/Layout';

export default function Home() {
  return (
    <>
      <Header />
      <HomeLayout />
      <Spacer />
      <Footer />
    </>
  );
}
