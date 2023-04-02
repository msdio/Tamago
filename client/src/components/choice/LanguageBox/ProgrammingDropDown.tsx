import { Box } from '@chakra-ui/react';

import ProgrammingDropDownItem from '@/components/choice/LanguageBox/ProgrammingDropDownItem';
import { getRandomProgrammingLanguage } from '@/utils/language';

interface ProgrammingDropDownProps {
  path: string;
}

export default function ProgrammingDropDown({ path }: ProgrammingDropDownProps) {
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
      {/* NOTE : map으로 하는게 좋을지 고민.. */}
      <ProgrammingDropDownItem path={`${path}?language=${getRandomProgrammingLanguage()}`} content='Random Code' />
      <ProgrammingDropDownItem path={`${path}?language=java`} content='Java' />
      <ProgrammingDropDownItem path={`${path}?language=python`} content='Python' />
      <ProgrammingDropDownItem path={`${path}?language=javascript`} content='Javascript' />
    </Box>
  );
}
