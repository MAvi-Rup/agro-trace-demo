import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" size={80} thickness={4} />
    </div>
  );
};

export default Loading;
