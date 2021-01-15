import Head from 'next/head';

const pageTitle = (title) => {
  let titleString = 'WWFeedback';
  if (title) titleString = `${title} - ${titleString}`;
  return titleString;
};

export default function Layout({
  children,
  title,
}) {
  return (
    <>
      <Head>
        <title>{pageTitle(title)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
