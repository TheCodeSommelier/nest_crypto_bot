import { createHmac } from 'node:crypto';

export const getNonce = () => {
  return Date.now().toString();
};

export const sign = ({ privKey = '', message = '' }) => {
  return createHmac('sha512', Buffer.from(privKey, 'base64'))
    .update(message, 'binary')
    .digest('base64');
};

export const mapToURLValues = (object: Record<any, any>) => {
  return new URLSearchParams(
    Object.entries(object).map(([k, v]) => {
      if (typeof v == 'object') {
        v = JSON.stringify(v);
      }
      return [k, v] as string[];
    }),
  );
};
