import './App.css'
import * as React from 'react';
import { useEffect } from 'react';
import { Box, TextField, InputLabel, FormControl, Select } from '@mui/material'
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const data = [
  {
    id: 'data-0',
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: 'data-1',
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: 'data-2',
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
  {
    id: 'data-3',
    x1: 159.44,
    x2: 384.85,
    y1: 195.97,
    y2: 325.12,
  },
  {
    id: 'data-4',
    x1: 188.86,
    x2: 182.27,
    y1: 351.77,
    y2: 144.58,
  },
  {
    id: 'data-5',
    x1: 143.86,
    x2: 360.22,
    y1: 43.253,
    y2: 146.51,
  },
  {
    id: 'data-6',
    x1: 202.02,
    x2: 209.5,
    y1: 376.34,
    y2: 309.69,
  },
  {
    id: 'data-7',
    x1: 384.41,
    x2: 258.93,
    y1: 31.514,
    y2: 236.38,
  },
  {
    id: 'data-8',
    x1: 256.76,
    x2: 70.571,
    y1: 231.31,
    y2: 440.72,
  },
  {
    id: 'data-9',
    x1: 143.79,
    x2: 419.02,
    y1: 108.04,
    y2: 20.29,
  },
  {
    id: 'data-10',
    x1: 103.48,
    x2: 15.886,
    y1: 321.77,
    y2: 484.17,
  },
  {
    id: 'data-11',
    x1: 272.39,
    x2: 189.03,
    y1: 120.18,
    y2: 54.962,
  },
  {
    id: 'data-12',
    x1: 23.57,
    x2: 456.4,
    y1: 366.2,
    y2: 418.5,
  },
  {
    id: 'data-13',
    x1: 219.73,
    x2: 235.96,
    y1: 451.45,
    y2: 181.32,
  },
  {
    id: 'data-14',
    x1: 54.99,
    x2: 434.5,
    y1: 294.8,
    y2: 440.9,
  },
  {
    id: 'data-15',
    x1: 134.13,
    x2: 383.8,
    y1: 121.83,
    y2: 273.52,
  },
  {
    id: 'data-16',
    x1: 12.7,
    x2: 270.8,
    y1: 287.7,
    y2: 346.7,
  },
  {
    id: 'data-17',
    x1: 176.51,
    x2: 119.17,
    y1: 134.06,
    y2: 74.528,
  },
  {
    id: 'data-18',
    x1: 65.05,
    x2: 78.93,
    y1: 104.5,
    y2: 150.9,
  },
  {
    id: 'data-19',
    x1: 162.25,
    x2: 63.707,
    y1: 413.07,
    y2: 26.483,
  },
  {
    id: 'data-20',
    x1: 68.88,
    x2: 150.8,
    y1: 74.68,
    y2: 333.2,
  },
  {
    id: 'data-21',
    x1: 95.29,
    x2: 329.1,
    y1: 360.6,
    y2: 422.0,
  },
  {
    id: 'data-22',
    x1: 390.62,
    x2: 10.01,
    y1: 330.72,
    y2: 488.06,
  },
];

const artists = [
  'Artist 1',
  'Artist 2',
  'Artist 3',
  'Artist 4',
  'Artist 5',
  'Artist 6',
  'Artist 7',
  'Artist 8',
  'Artist 9',
  'Artist 10',
  'Artist 11',
  'Artist 12',
  'Artist 13',
  'Artist 14',
  'Artist 15',
  'Artist 16',
  'Artist 17',
  'Artist 18',
  'Artist 19',
  'Artist 20',
];

function App() {
  const [artistName, setArtistName] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectSize, setSelectSize] = React.useState(10);

  const filteredArtists = artists.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArtistName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArtistName(value);
  };

  useEffect(() => {
    const resize = () => {
      const optionHeight = 40;
      const maxHeight = window.innerHeight - 150;
      setSelectSize(Math.floor(maxHeight / optionHeight));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '25%', m: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField fullWidth label="Search" variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FormControl fullWidth size='medium' sx={{ height: '100%', mt: 2}}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Artists
            </InputLabel>
            <Select<string[]>
              multiple
              native
              value={artistName}
              onChange={handleArtistName}
              label="Artists"
              inputProps={{
                id: 'select-multiple-native',
                size: selectSize
              }}
              sx={{ '& option': { padding: '10px 5px' } }}
            >
              {filteredArtists.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ border: '1px solid grey', width: '75%', m: 1, p: 2 }}>
          <ScatterChart sx={{width: '100%', height: '100%'}}
            xAxis={[{ id: 'x-axis', label: '# of Spotify Listeners' }]}
            yAxis={[{ id: 'y-axis', label: '# of YouTube Views (Top Song)' }]}
            series={[
              {
                label: 'Series A',
                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
              },
              {
                label: 'Series B',
                data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
              },
            ]}
          />
        </Box>
      </Box>
    </>
  )
}

export default App;
