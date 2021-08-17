import { createRef } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { App } from './App';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const noticeStackRef = createRef();
const onClickDismiss = key => () => {
  noticeStackRef.current.closeSnackbar(key);
}

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    ref={noticeStackRef}
    action={(key) => (
      <IconButton onClick={onClickDismiss(key)}>
        <CloseIcon />
      </IconButton>
    )}
    maxSnack={3}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);
