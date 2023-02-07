import { Img, Icon } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';

export default function Checkbox(props: any): ReactElement<any, string | JSXElementConstructor<any>> {
  const { isIndeterminate, isChecked, ...reset } = props;
  console.log(props);
  return (
    <>
      {isChecked ? (
        <Icon viewBox='0 0 19 19' {...reset}>
          <Img src='images/checkbox_true_1.svg' />
        </Icon>
      ) : (
        <Icon viewBox='0 0 19 19' {...reset}>
          <Img src='images/checkbox_false_1.svg' />
        </Icon>
      )}
    </>
  );
}
