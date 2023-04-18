import { Head, Html, Main, NextScript } from 'next/document';

import MetaInfo from '@/components/meta-info';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <MetaInfo />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
