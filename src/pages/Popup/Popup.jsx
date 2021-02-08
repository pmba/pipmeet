import React, { useState } from 'react';
import VideoCard from './components/VideoCard';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';

import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  toolbar: {
    minHeight: 'fit-content',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flex: 1,
  },
  content: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollableContent: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    maxHeight: 300,
    overflowY: 'scroll',
  },
}));

const Popup = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const searchForAvailableWebcams = () => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(
          tab.id,
          { action: 'searchForVideos' },
          function (response) {
            if (!window.chrome.runtime.lastError) {
              if (response) setVideos(response);
            }
          }
        );
      });
    });
  };

  const requestPipFromName = (name) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(
          tab.id,
          { action: 'requestPip', user: name },
          function (response) {
            if (!window.chrome.runtime.lastError) {
              console.log(response);
            }
          }
        );
      });
    });
  };

  const Content = () => {
    if (videos.length == 0) {
      return (
        <Container maxWidth="sm" className={classes.content}>
          <Typography variant="button" id="message">
            Nada por Aqui
          </Typography>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="sm" className={classes.scrollableContent}>
          {videos.map((video, i) => {
            return (
              <VideoCard
                key={i}
                title={video.userName}
                subheader="Lorem ipsum dolor sit amet."
                src={video.userImage}
                onClick={() => {
                  requestPipFromName(video.userName);
                }}
              />
            );
          })}
        </Container>
      );
    }
  };

  return (
    <div className="App" className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            spacing={0}
          >
            <Typography variant="h6">Google Meet</Typography>
            <Typography variant="overline">Picture in Picture</Typography>
          </Grid>

          {/* <Button color="inherit">Atualizar</Button> */}

          <Tooltip title="Procurar Vídeos" aria-label="search">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={searchForAvailableWebcams}
            >
              <CachedOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Content />
    </div>
  );
};

export default Popup;
