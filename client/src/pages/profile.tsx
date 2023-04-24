import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Badge from '@/components/profile/Badge';
import BattleField from '@/components/profile/BattleField';
import CreateWriting from '@/components/profile/CreateWriting';
import FrequentlyWord from '@/components/profile/FrequentlyWord';
import TierTrend from '@/components/profile/TierTrend';
import TotalInfo from '@/components/profile/TotalInfo';
import TypingStatistic from '@/components/profile/TypingStatistic';

export default function Profile() {
  useEffect(() => {
    // getUserProfile();
    // getAllStatistic();
  }, []);

  return (
    <Box minW='1100px' bg='white.dark'>
      <Header />
      <Flex flexDirection='column' gap='42px' as='main' padding='57px  120px 77px'>
        <Flex gap='31px'>
          <Box>
            <Badge tier={5} />
            <Box marginTop='32px' h='126px'>
              <TotalInfo writingCount={0} practiceCount={0} actualCount={0} />
            </Box>
          </Box>
          <Box h='332px' flex={1}>
            <BattleField />
          </Box>
        </Flex>
        <Flex gap='24px'>
          <Box flex={1} h='370px'>
            <CreateWriting />
          </Box>
          <Box w='516px' h='370px'>
            <TierTrend />
          </Box>
        </Flex>
        <Flex gap='24px'>
          <Box w='727px'>
            <TypingStatistic />
          </Box>
          <Box flex={1}>
            <FrequentlyWord />
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}
