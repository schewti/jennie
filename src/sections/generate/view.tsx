// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// components
import { useSettingsContext } from 'src/components/settings';
import React, { useRef, useState } from 'react';
import { randomLotto } from 'src/utils/lotto';
import { Button, Grid, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import html2canvas from 'html2canvas';
import LottoType1 from './lotto-type-1';

// ----------------------------------------------------------------------

export default function GenerateView() {
  const lottoRef = useRef(null);

  const lottoList = ['ลาวพัฒนา', 'ไทยพัฒนา'];
  const refs = lottoList.map(() => React.createRef<HTMLDivElement>());

  const [lottoNumbers, setLottoNumbers] = useState(randomLotto());

  const generateLottoViewImage = async (
    ref: React.RefObject<HTMLDivElement>,
    lottoName: string
  ) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 0.5 });
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `${lottoName}-lotto.png`;
    link.click();
  };

  const downloadAllLottoViewImage = async () => {
    for (let i = 0; i < lottoList.length; i++) {
      generateLottoViewImage(refs[i], lottoList[i]);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2"> Page GenerateView </Typography>

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {lottoList.map((lottoName, index) => (
          <LottoType1
            key={index}
            lottoName={lottoName}
            lottoNumbers={randomLotto()}
            ref={refs[index]}
          />
        ))}
      </div>
      {/* <LottoType1 lottoName="ลาวพัฒนา" lottoNumbers={lottoNumbers} ref={lottoRef} /> */}
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start" />
      <Button variant="contained" onClick={downloadAllLottoViewImage}>
        DOWNLOAD ALL
      </Button>
    </Container>
  );
}
