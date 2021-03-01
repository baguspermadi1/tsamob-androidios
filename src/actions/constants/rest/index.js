import app from '../../../../app.json';

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
  authentication: {
    login: `${baseUrl()}/api/v1/authentication/login`,
    otp: `${baseUrl()}/api/v1/authentication/authenticate`,
    refreshToken: `${baseUrl()}/api/v1/authentication/refresh-token`,
    checkToken: `${baseUrl()}/api/v1/authentication/check-token`,
    logout: `${baseUrl()}/api/v1/account/logout`,
  },
};

export default rest;
