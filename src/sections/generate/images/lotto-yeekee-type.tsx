// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import React, { useRef, useState } from 'react';
import { RandomLottoNormalType, RandomLottoYeekeeType, randomLotto } from 'src/utils/lotto';
import { Button, Grid, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import html2canvas from 'html2canvas';
import './type.css';
// ----------------------------------------------------------------------

export default React.forwardRef(
  (
    {
      type = '5',
      lottoNumbers,
      date,
    }: {
      type: '5' | '15';
      lottoNumbers: RandomLottoYeekeeType[];
      date: Date;
    },
    ref
  ) => (
    <Box
      ref={ref}
      style={{
        backgroundImage: `url(/assets/lotto/yeekee_${type}.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 1280,
        width: 1023,
        color: 'common.white',
        position: 'relative',
      }}
    >
      <p
        className="number-highlight"
        style={{
          position: 'absolute',
          margin: 0,
          top: 85,
          right: 140,
          fontSize: 60,
          fontWeight: 'bold',
        }}
      >
        {date.toLocaleDateString('en-GB')}
      </p>
      {lottoNumbers.map((lottoNumber, index) => (
        <div key={index}>
          <p
            className="number-highlight"
            style={{
              position: 'absolute',
              top: 250 + index * 80,
              left: 105,
              fontSize: 60,
              fontWeight: 'bold',
              width: 100,
              textAlign: 'center',
            }}
          >
            {`${lottoNumber.round}`}
          </p>
          <p
            className="number-highlight"
            style={{
              position: 'absolute',
              top: 250 + index * 80,
              left: 470,
              fontSize: 60,
              fontWeight: 'bold',
              width: 100,
              textAlign: 'center',
            }}
          >
            {`${lottoNumber.firstNumber}`}
          </p>
          <p
            className="number-highlight"
            style={{
              position: 'absolute',
              top: 250 + index * 80,
              left: 700,
              fontSize: 60,
              fontWeight: 'bold',
              width: 100,
              textAlign: 'center',
            }}
          >
            {`${lottoNumber.secondNumber}`}
          </p>
        </div>
      ))}
      {/* <p
        className="number-highlight"
        style={{
          position: 'absolute',
          top: 235,
          left: 105,
          fontSize: 60,
          fontWeight: 'bold',
          width: 100,
          textAlign: 'center',
        }}
      >
        {`${lottoNumbers[0].round}`}
      </p>
      <p
        className="number-highlight"
        style={{
          position: 'absolute',
          top: 335,
          left: 105,
          fontSize: 60,
          width: 100,
          fontWeight: 'bold',
        }}
      >
        {`${lottoNumbers[1].round}`}
      </p> */}
    </Box>
  )
);
