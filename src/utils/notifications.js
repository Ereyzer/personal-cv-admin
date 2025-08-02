import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

import { info, error, success } from '@pnotify/core';
const infoNotify = (title, text) => {
  info({
    title,
    text,
  });
};

const errorNotify = (title, text) => {
  error({ title, text });
};

const successNotify = (title, text) => {
  success({ title, text });
};

export const notifications = { info: infoNotify, error: errorNotify, success: successNotify };
