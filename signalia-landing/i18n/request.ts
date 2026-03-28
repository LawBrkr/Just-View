import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  return {
    locale: 'es',
    messages: {},
    timeZone: 'America/Mexico_City'
  };
});
