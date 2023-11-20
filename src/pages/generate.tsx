import { Helmet } from 'react-helmet-async';
// sections
import GenerateView from 'src/sections/generate/view';

// ----------------------------------------------------------------------

export default function PageGenerate() {
  return (
    <>
      <Helmet>
        <title> GENERATE STUFF</title>
      </Helmet>

      <GenerateView />
    </>
  );
}
