import { IconButton } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import React from 'react';
import styles from './Starter.module.css';

const Starter: React.FC = () => {
  return (
    <>
      <span className={styles.text}>Mui + Mui icons installed!</span>
      <IconButton aria-label="start">
        <StartIcon />
      </IconButton>
    </>
  );
};

export default Starter;
