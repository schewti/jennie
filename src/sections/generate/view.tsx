// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// components
import { useSettingsContext } from 'src/components/settings';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { LOTTO, RandomLottoType1, randomLotto } from 'src/utils/lotto';
import {
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import html2canvas from 'html2canvas';
import { isIOS } from 'src/utils/device';
import LottoType1 from './lotto-type-1';

// ----------------------------------------------------------------------

export default function GenerateView() {
  const isIos = isIOS();
  const [checked, setChecked] = useState(['']);
  const [lottoList, setLottoList] = useState(LOTTO);
  // const lottoNumberList = lottoList.map(() => randomLotto());
  const [refs, setRefs] = useState([] as React.RefObject<HTMLDivElement>[]);
  const [open, setOpen] = useState(true);

  // const refs = lottoList.map(() => React.createRef<HTMLDivElement>());
  const [lottoNumberList, setLottoNumberList] = useState([] as RandomLottoType1[]);

  useEffect(() => {
    setLottoNumberList(lottoList.map(() => randomLotto()));
    setRefs(lottoList.map(() => React.createRef<HTMLDivElement>()));
  }, [lottoList]);

  const generateLottoViewImage = async (
    ref: React.RefObject<HTMLDivElement>,
    lottoName: string
  ) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 1 });
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    const d = new Date();
    const datestring = `${d.getDate()}${
      d.getMonth() + 1
    }${d.getFullYear()}${d.getHours()}${d.getMinutes()}`;
    link.download = `${lottoName}_${datestring}.png`;
    link.click();
  };

  const generateLottoViewImageIos = async (
    ref: React.RefObject<HTMLDivElement>,
    lottoName: string
  ) => {
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current, { scale: 1 });
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.target = '_blank';
        link.click();

        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const downloadCheckedLottoImage = async () => {
    for (let i = 0; i < lottoList.length; i++) {
      if (checked.indexOf(lottoList[i]) === -1) {
        continue;
      }
      if (isIos) {
        generateLottoViewImageIos(refs[i], lottoList[i]);
      } else {
        generateLottoViewImage(refs[i], lottoList[i]);
      }
    }
  };

  const getLottoNumberPreview = (lottoNumber: RandomLottoType1) => {
    if (!lottoNumber) {
      return '';
    }

    return (
      `(${lottoNumber.mainNumber}) ` +
      `[${lottoNumber.singleNumber.first}, ${lottoNumber.singleNumber.second}] ` +
      `[${lottoNumber.tripleNumber.join(',')}] ` +
      `[${lottoNumber.doubleNumber.first.join(',')}] ` +
      `[${lottoNumber.doubleNumber.second.join(',')}]`
    );
  };

  const handleCheck = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2"> DUNCHESS LOTTO </Typography>
      <Button variant="contained" onClick={handleClick} style={{ marginRight: 10 }}>
        {open ? 'HIDDEN' : 'SHOW'}
      </Button>
      <Button variant="contained" onClick={downloadCheckedLottoImage}>
        DOWNLOAD SELECTED
      </Button>
      <Container maxWidth="xs">
        <Collapse in={open} unmountOnExit>
          <List style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {lottoList.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItemButton key={value} role={undefined} dense onClick={handleCheck(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    id={labelId}
                    primary={value}
                    secondary={getLottoNumberPreview(lottoNumberList[index])}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </Container>

      {/* <LottoType1 lottoName={lottoList[1]} lottoNumbers={lottoNumberList[1]} ref={refs[1]} /> */}

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {lottoNumberList.map((value, index) => (
          <LottoType1
            key={index}
            lottoName={lottoList[index]}
            lottoNumbers={value}
            ref={refs[index]}
          />
        ))}
      </div>
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start" />
    </Container>
  );
}
