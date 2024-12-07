import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses } from "@mui/x-charts";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";

/* const data = [
  {
    x1: 329.39,
    y1: 443.28,
  },
  ]; */

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [artistName, setArtistName] = React.useState<string[]>([]);
  const [artists, setArtists] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectSize, setSelectSize] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataPopup, setDataPopup] = React.useState([]);
  const [artistData, setArtistData] = React.useState({});

  const filteredArtists = artists.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleArtistName = (event) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArtistName(value);
  };

  const handleOpen = () => {
    const doRequest = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/artists/stats?artist_id=${artistName[0]}`,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:5000",
            },
          },
        ); //api
        //setArtists(response.data);
        setDataPopup(response.data["data"]);
      } catch (error) {
        console.error("ERROR BRUH", error);
      }
    };
    doRequest();

    const doRequest2 = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/artists?artist_id=${artistName[0]}`,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:5000",
            },
          },
        ); //api
        //setArtists(response.data);
        setArtistData(response.data["data"]);
        console.log("NEXT");
        console.log(artistData);
      } catch (error) {
        console.error("ERROR BRUH", error);
      }
    };
    doRequest2();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/artists/list",
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:5000",
            },
          },
        ); //api
        //setArtists(response.data);
        const artists_temp = response.data["data"].map(
          (item: string) => item["name"],
        );
        setArtists(artists_temp);
      } catch (error) {
        console.error("ERROR BRUH", error);
      }
    };
    fetchArtists();

    const fetchArtistData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/artists/stats",
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:5000",
            },
          },
        ); //api
        //setArtists(response.data);

        const points_temp = response.data["data"].map((item) => ({
          x1: item["listeners_count"],
          y1: item["views_count"],
        }));
        setData(points_temp);
      } catch (error) {
        console.error("ERROR BRUH", error);
      }
    };
    fetchArtistData();

    const resize = () => {
      const optionHeight = 40;
      const maxHeight = window.innerHeight - 150;
      setSelectSize(Math.floor(maxHeight / optionHeight));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "lightgrey",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "25%",
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FormControl fullWidth size="medium" sx={{ height: "100%", mt: 2 }}>
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
                id: "select-multiple-native",
                size: selectSize,
              }}
              sx={{ "& option": { padding: "10px 5px" } }}
            >
              {filteredArtists.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleOpen}>
            Open Artist View
          </Button>
          <Dialog
            fullWidth
            maxWidth="xl"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{artistName}</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    height: "66vh",
                    width: "25%",
                    m: 1,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>
                    <strong>Artist Name:</strong> {artistName} <br />
                    <strong>Listeners Count:</strong>{" "}
                    {artistData.listeners_count} <br />
                    <br />
                    <strong>Top Song:</strong> {artistData.youtube_title} <br />
                    <strong>Genre:</strong> {artistData.genre}
                    <br />
                    <br />
                    <strong>Video URL:</strong> {artistData.youtube_url}
                    <br />
                    <strong>View Count:</strong> {artistData.view_count}
                    <br />
                    <strong>Like Count:</strong> {artistData.like_count}
                    <br />
                  </Typography>
                </Box>
                <Box
                  sx={{ border: "1px solid grey", width: "75%", m: 1, p: 2 }}
                >
                  <ScatterChart
                    sx={{
                      width: "100%",
                      height: "100%",
                      [`& .${axisClasses.left} .${axisClasses.label}`]: {
                        transform: "translateX(-12px)",
                      },
                    }}
                    xAxis={[{ id: "x-axis", label: "# of YouTube Views" }]}
                    yAxis={[{ id: "y-axis", label: "# of YouTube Likes" }]}
                    series={[
                      {
                        label: "Data Points",
                        data: dataPopup.map((v) => ({
                          x: v.views_count,
                          y: v.likes_count,
                        })),
                      },
                    ]}
                  />
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
        <Box sx={{ border: "1px solid grey", width: "75%", m: 1, p: 2 }}>
          <ScatterChart
            sx={{
              width: "100%",
              height: "100%",
              [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translateX(-12px)",
              },
            }}
            xAxis={[{ id: "x-axis", label: "# of Spotify Listeners" }]}
            yAxis={[{ id: "y-axis", label: "# of YouTube Views (Top Song)" }]}
            series={[
              {
                label: "Data Points",
                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
