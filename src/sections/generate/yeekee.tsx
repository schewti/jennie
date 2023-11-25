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
import {
  LOTTO,
  RandomLottoNormalType,
  RandomLottoYeekeeType,
  randomLotto,
  randomYeekeeLotto,
} from 'src/utils/lotto';
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import html2canvas from 'html2canvas';
import { isIOS } from 'src/utils/device';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { chunkArray } from 'src/utils/arrs';
import LottoNormalType from './images/lotto-normal-type';
import LottoYeekeeType from './images/lotto-yeekee-type';

// ----------------------------------------------------------------------

export default function GenerateYeekee() {
  const chunkSize = 10;
  const [checked, setChecked] = useState(LOTTO);
  const [lottoList, setLottoList] = useState(LOTTO);
  const [refs, setRefs] = useState([] as React.RefObject<HTMLDivElement>[]);
  const ref = useRef(null);
  const [isAll, setIsAll] = useState(true);
  const [dateValue, setDateValue] = useState<Date>(new Date());
  // const [lottoNumberList, setLottoNumberList] = useState([] as RandomLottoYeekeeType[]);
  const [lottoNumberList, setLottoNumberList] = useState(randomYeekeeLotto(15));
  const [lottoType, setLottoType] = useState('5' as '5' | '15');

  const lottoNumberChunk = useCallback(
    (arr: RandomLottoYeekeeType[], size: number) => chunkArray(arr, size),
    []
  );

  const handleChangeLottoType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as '5' | '15';
    setLottoType(value);
  };

  useEffect(() => {
    const yeekeeRoundMap = {
      5: 264,
      15: 88,
    };

    const round = yeekeeRoundMap[lottoType];
    setLottoNumberList(randomYeekeeLotto(round));

    const refSize = Math.ceil(round / chunkSize);

    setRefs(Array.from({ length: refSize }, () => React.createRef<HTMLDivElement>()));
  }, [lottoType]);

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
    const imagePromises = refs
      .map((lRef) => {
        if (!lRef.current) return null;

        return html2canvas(lRef.current, { scale: 1 }).then((canvas) => {
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h2"> เป็นหนึ่ง100 (ยี่กี)</Typography>
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
        {/* <Button variant="contained" onClick={toggleAll} style={{ marginRight: 10 }}>
          {isAll ? 'DESELECT ALL' : 'SELECT ALL'}
        </Button> */}

        <RadioGroup
          row
          defaultValue="5"
          onChange={handleChangeLottoType}
          style={{ display: 'block' }}
        >
          <FormControlLabel value="5" control={<Radio />} label="ยี่กี 5 นาที" />
          <FormControlLabel value="15" control={<Radio />} label="ยี่กี 15 นาที" />
        </RadioGroup>

        <Button variant="contained" onClick={viewAllLottoViewImage}>
          DOWNLOAD
        </Button>
        {/* <List style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {lottoNumberChunk(lottoList, 10).map((value, index) => {
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
        </List> */}
      </Container>

      {/* <LottoYeekeeType
        lottoNumbers={lottoNumberList.slice(0, chunkSize)}
        type={lottoType}
        ref={ref}
        date={dateValue}
      /> */}

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {lottoNumberChunk(lottoNumberList, chunkSize).map((value, index) => (
          <LottoYeekeeType
            key={index}
            lottoNumbers={value}
            type="5"
            ref={refs[index]}
            date={dateValue}
          />
        ))}
      </div>
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start" />
    </Container>
  );
}
