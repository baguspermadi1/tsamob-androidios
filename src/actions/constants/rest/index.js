import app from '../../../../app.json';

const baseUrl =
  app.environment === 'production'
    ? app.url.prod
    : app.environment === 'qa'
    ? app.url.qa
    : app.url.dev;

const rest = {
  authentication: {
    login: `${baseUrl}/api/v1/authentication/login`,
    otp: `${baseUrl}/api/v1/authentication/authenticate`,
    refreshToken: `${baseUrl}/api/v1/authentication/refresh-token`,
    checkToken: `${baseUrl}/api/v1/authentication/check-token`,
    logout: `${baseUrl}/api/v1/account/logout`,
  },
  password: {
    forgot: `${baseUrl}/api/v1/account/forgot-password`,
    reset: `${baseUrl}/api/v1/account/reset-password`,
    change: `${baseUrl}/api/v1/account/update-password`,
  },
  registration: {
    check: `${baseUrl}/api/v1/account/check-user`,
    verifyRegistration: `${baseUrl}/api/v1/account/register`,
    sendActivationMail: `${baseUrl}api/v1/account/send-activation`,
  },
};

export default rest;
