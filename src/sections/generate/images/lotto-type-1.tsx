// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import React, { useRef, useState } from 'react';
import { RandomLottoType1, randomLotto } from 'src/utils/lotto';
import { Button, Grid, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import html2canvas from 'html2canvas';
import './type.css';
// ----------------------------------------------------------------------

export default React.forwardRef(
  (
    {
      lottoName,
      lottoNumbers,
      date,
    }: {
      lottoName: string;
      lottoNumbers: RandomLottoType1;
      date: Date;
    },
    ref
  ) => (
    <>
      <Box
        ref={ref}
        style={{
          backgroundImage: 'url(/assets/lotto/type1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 1000,
          width: 1000,
          color: 'common.white',
          position: 'relative',
        }}
      >
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            margin: 0,
            top: 10,
            right: 10,
            fontSize: 50,
            fontWeight: 'bold',
          }}
        >
          {date.toLocaleDateString('en-GB')}
        </p>
        <p
          style={{
            color: '#000',
            position: 'absolute',
            top: 48,
            left: '50%',
            width: 800,
            transform: 'translateX(-50%)',
            fontSize: 75,
            fontWeight: 'bold',
            textShadow: `3px 3px 0 #C3A85C,
            -3px 3px 0 #C3A85C,
            -3px -3px 0 #C3A85C,
            3px -3px 0 #C3A85C`,
          }}
        >
          {lottoName}
        </p>
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            top: 260,
            left: 380,
            fontSize: 80,
            fontWeight: 'bold',
          }}
        >
          {`${lottoNumbers.singleNumber.first} - ${lottoNumbers.singleNumber.second}`}
        </p>
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            top: 235,
            left: 695,
            fontSize: 150,
            fontWeight: 'bold',
          }}
        >
          {`${lottoNumbers.mainNumber}`}
        </p>
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            top: 400,
            left: 180,
            fontSize: 55,
            fontWeight: 'bold',
          }}
        >
          {`${lottoNumbers.tripleNumber[0]} - ${lottoNumbers.tripleNumber[1]} - ${lottoNumbers.tripleNumber[2]}`}
        </p>
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            top: 480,
            left: 220,
            fontSize: 55,
            fontWeight: 'bold',
          }}
        >
          {`${lottoNumbers.doubleNumber.first[0]} - ${lottoNumbers.doubleNumber.first[1]} - ${lottoNumbers.doubleNumber.first[2]}`}
        </p>
        <p
          className="number-highlight"
          style={{
            position: 'absolute',
            top: 560,
            left: 220,
            fontSize: 55,
            fontWeight: 'bold',
          }}
        >
          {`${lottoNumbers.doubleNumber.second[0]} - ${lottoNumbers.doubleNumber.second[1]} - ${lottoNumbers.doubleNumber.second[2]}`}
        </p>
      </Box>
      {/* <Button variant="contained" onClick={generateRandomLotto}>
        Random
      </Button>
      <Button variant="contained" onClick={handleDownloadImage}>
        Download
      </Button> */}
    </>
  )
);
