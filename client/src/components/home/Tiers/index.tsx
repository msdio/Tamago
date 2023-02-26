import { Container, Flex, Heading, Text } from '@chakra-ui/react';

import { Tier } from '@/components/common/Tiers';

interface TierInfoProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  text: string;
  label: string;
}

const tierInfo: TierInfoProps[] = [
  {
    level: 0,
    text: 'GUEST',
    label: '깃털',
  },
  {
    level: 1,
    text: 'Lv.1',
    label: '달걀',
  },
  {
    level: 2,
    text: 'Lv.2',
    label: '갓 난 병아리',
  },
  {
    level: 3,
    text: 'Lv.3',
    label: '병아리',
  },
  {
    level: 4,
    text: 'Lv.4',
    label: '청소년 병아리',
  },
  {
    level: 5,
    text: 'Lv.5',
    label: '위풍당당한 닭',
  },
];

export default function Tiers() {
  return (
    <Container
      maxW='container.xl'
      w='100%'
      h='757px'
      mt='7rem'
      display='flex'
      flexDirection='column'
      textAlign='center'
    >
      <Text fontSize='1.5625rem' mb='1.3125rem'>
        Tier
      </Text>
      <Heading lineHeight='160%'>
        본인의 레벨에 맞는 티어를 통해
        <br />
        성장하고 공유할 수 있어요.
      </Heading>

      <Flex gap='1.625rem' justifyContent='center' mt='4.4375rem'>
        {tierInfo.map((el) => (
          <Flex w='178px' h='17.875rem' key={el.level} alignItems='center' flexDirection='column'>
            <Flex w='100%' h='15.375rem' flexDirection='column' justifyContent='space-between' alignItems='center'>
              <Tier level={el.level} />
              <Text fontSize='1.625rem' fontWeight='extrabold' mt='1.625rem' alignItems='flex-end'>
                {el.text}
              </Text>
            </Flex>
            <Text fontSize='1.25rem' mt='.9375rem'>
              {el.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
}
