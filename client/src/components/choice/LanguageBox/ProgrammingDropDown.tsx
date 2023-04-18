import { Box } from '@chakra-ui/react';

import ProgrammingDropDownItem from '@/components/choice/LanguageBox/ProgrammingDropDownItem';
import { SELECT_PROGRAMMING_LANGUAGE } from '@/constants/language';

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
      zIndex='1'
    >
      {Object.values(SELECT_PROGRAMMING_LANGUAGE).map(({ value, label }) => (
        <ProgrammingDropDownItem key={value} path={`${path}?language=${value}`} content={label} />
      ))}
    </Box>
  );
}
