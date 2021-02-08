import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 16,
    marginBottom: 16,
  },
  avatar: {},
}));

const VideoCard = ({ title, subheader, src, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={src}>
            {title.charAt(0)}
          </Avatar>
        }
        action={
          <Tooltip title="Destacar Vídeo" aria-label="detach">
            <IconButton aria-label="settings" onClick={onClick}>
              <CallMadeIcon />
            </IconButton>
          </Tooltip>
        }
        title={title}
        subheader={subheader}
      />
    </Card>
  );
};

export default VideoCard;
