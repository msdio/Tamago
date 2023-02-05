import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'GangwonEduPower';
      font-weight: normal;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gangwon/GangwonEduPower.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gangwon/GangwonEduPower.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/gangwon/GangwonEduPower.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/gangwon/GangwonEduPower.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/gangwon/GangwonEduPower.ttf') format('truetype');
      font-display: swap;
    }
  `}
  />
);

export default Fonts;
