import Banner from '../Banner';
import Landing from '../Landing';
import Menus from '../Menus';
import Stats from '../Stats';
import Tiers from '../Tiers';

export default function HomeLayout() {
  return (
    <>
      <Landing />
      <Menus />
      <Stats />

      <Banner />

      <Tiers />
    </>
  );
}
