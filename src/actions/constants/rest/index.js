import app from '../../../app.json';

const baseUrl = () => {
  if (app.environment === 'production') {
    return app.url.prod;
  } else if (app.environment === 'qa') {
    return app.url.qa;
  } else {
    return app.url.dev;
  }
};

const rest = {
  login: `${baseUrl}/api/login`,
};

export default rest;
