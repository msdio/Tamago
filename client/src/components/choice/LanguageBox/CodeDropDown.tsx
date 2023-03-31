import { Box } from '@chakra-ui/react';

import CodeDropDownItem from '@/components/choice/LanguageBox/CodeDropDownItem';

const getRandomCodeLanguage = () => {
  const languageList = ['java', 'python', 'javascript'];
  const randomIdx = Math.floor(Math.random() * languageList.length);

  return languageList[randomIdx];
};

export default function CodeDropDown({ path }: { path: string }) {
  return (
    <Box
      pos='absolute'
      border='0.6px solid'
      borderColor='black.dark'
      top='148px'
      bg='#FFFFFF'
      w='400px'
      borderRadius='10px'
      overflow='hidden'
    >
      <CodeDropDownItem path={`${path}?language=${getRandomCodeLanguage()}`} content='Random Code' />
      <CodeDropDownItem path={`${path}?language=java`} content='Java' />
      <CodeDropDownItem path={`${path}?language=python`} content='Python' />
      <CodeDropDownItem path={`${path}?language=javascript`} content='Javascript' />
    </Box>
  );
}
