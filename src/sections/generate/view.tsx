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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import LottoType1 from './lotto-type-1';

// ----------------------------------------------------------------------

export default function GenerateView() {
  const isIos = isIOS();
  const [checked, setChecked] = useState(LOTTO);
  const [lottoList, setLottoList] = useState(LOTTO);
  // const lottoNumberList = lottoList.map(() => randomLotto());
  const [refs, setRefs] = useState([] as React.RefObject<HTMLDivElement>[]);
  const [isAll, setIsAll] = useState(true);
  const [dateValue, setDateValue] = useState<Date>(new Date());
  // const refs = lottoList.map(() => React.createRef<HTMLDivElement>());
  const [lottoNumberList, setLottoNumberList] = useState([] as RandomLottoType1[]);

  useEffect(() => {
    setLottoNumberList(lottoList.map(() => randomLotto()));
    setRefs(lottoList.map(() => React.createRef<HTMLDivElement>()));
  }, [lottoList]);

  // const viewAllLottoViewImage = async () => {
  //   const checkedLottos = lottoList.filter((lottoName) => checked.includes(lottoName));
  //   const newWindow = window.open('', '_blank');
  //   if (!newWindow) return;

  //   const imagePromises = checkedLottos
  //     .map(async (lottoName) => {
  //       const index = lottoList.indexOf(lottoName);
  //       const ref = refs[index];
  //       if (!ref.current) return null;

  //       const canvas = await html2canvas(ref.current, { scale: 1 });

  //       const image = canvas.toDataURL('image/png', 1.0);
  //       newWindow.document.body.innerHTML += `<img src="${image}" alt="${checkedLottos[index]}" style="margin-bottom: 20px;"/><br/>`;

  //       return image;
  //     })
  //     .filter(Boolean);

  //   await Promise.all(imagePromises);
  // };

  const viewAllLottoViewImage = async () => {
    const checkedLottos = lottoList.filter((lottoName) => checked.includes(lottoName));
    const newWindow = window.open('', '_blank');
    if (!newWindow) return;

    newWindow.document.write('<p>Loading... <span id="loading-percent">0%</span></p>');

    const updateLoadingPercentage = (percent: number) => {
      const loadingElement = newWindow.document.getElementById('loading-percent');
      if (loadingElement) {
        loadingElement.textContent = `${percent}%`;
      }
    };

    let loadedCount = 0;
    const imagePromises = checkedLottos
      .map((lottoName) => {
        const index = lottoList.indexOf(lottoName);
        const ref = refs[index];
        if (!ref.current) return null;

        return html2canvas(ref.current, { scale: 1 }).then((canvas) => {
          loadedCount++;
          updateLoadingPercentage(Math.round((loadedCount / checkedLottos.length) * 100));
          return canvas.toDataURL('image/png', 1.0);
        });
      })
      .filter(Boolean);

    const images = await Promise.all(imagePromises);

    newWindow.document.body.innerHTML = '';
    images.forEach((image, index) => {
      newWindow.document.body.innerHTML += `<img src="${image}" alt="${checkedLottos[index]}" style="margin-bottom: 20px;"/><br/>`;
    });
  };

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

  const toggleAll = () => {
    if (isAll) {
      setChecked([]);
    } else {
      setChecked(lottoList);
    }
    setIsAll(!isAll);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2"> เป็นหนึ่ง100 </Typography>
      <Container maxWidth="xs">
        <MobileDatePicker
          orientation="portrait"
          label="date"
          value={dateValue}
          onChange={(newValue) => {
            if (newValue === null) {
              setDateValue(new Date());

              return;
            }

            setDateValue(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        />
        <Button variant="contained" onClick={toggleAll} style={{ marginRight: 10 }}>
          {isAll ? 'DESELECT ALL' : 'SELECT ALL'}
        </Button>
        {/* <Button variant="contained" onClick={downloadCheckedLottoImage} style={{ marginRight: 10 }}>
          DOWNLOAD SELECTED
        </Button> */}
        <Button variant="contained" onClick={viewAllLottoViewImage}>
          DOWNLOAD SELECTED
        </Button>
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
      </Container>

      {/* <LottoType1
        lottoName={lottoList[1]}
        lottoNumbers={lottoNumberList[1]}
        ref={refs[1]}
        date={dateValue}
      /> */}

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {lottoNumberList.map((value, index) => (
          <LottoType1
            key={index}
            lottoName={lottoList[index]}
            lottoNumbers={value}
            ref={refs[index]}
            date={dateValue}
          />
        ))}
      </div>
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start" />
    </Container>
  );
}
