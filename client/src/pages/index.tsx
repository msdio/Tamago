import { css } from '@emotion/react';

export default function Home() {
  return (
    <h1
      css={css({
        color: 'red',
      })}
    >
      hello next!
    </h1>
  );
}

// export default function Home() {
//   return <h1>hello next!</h1>;
// }
