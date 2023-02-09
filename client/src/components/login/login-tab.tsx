import { Tab } from '@chakra-ui/react';

export default function LoginTab({ children }: { children: string }) {
  return (
    <Tab
      _selected={{ borderBottom: '5px solid #FF8A65', fontWeight: 700 }}
      borderBottom='5px solid #fff'
      padding={0}
      marginRight={6}
      fontSize='22px'
    >
      {children}
    </Tab>
  );
}
