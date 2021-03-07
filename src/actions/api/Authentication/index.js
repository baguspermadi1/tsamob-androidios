import redux from '@actions/constants/redux';
import rest from '@actions/constants/rest';
import template from '../template';

const Authentication = {
  postLoginCustomer: ({email, password}) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.AUTHENTICATION.LOGIN,
      url: rest.authentication.login,
      body: {
        Username: email,
        Password: password,
      },
    });
  },
  postVerifyOTP: ({loginToken, otpCode}) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.AUTHENTICATION.VERIFY_OTP,
      url: rest.authentication.otp,
      body: {
        LoginToken: loginToken,
        OtpCode: otpCode,
      },
    });
  },
  postLogout: ({accessToken, navigation}) => {
    return template.fetchAPIAccess({
      method: 'POST',
      reduxAction: redux.AUTHENTICATION.LOGOUT,
      url: rest.authentication.logout,
      accessToken: accessToken,
      navigation: navigation,
    });
  },
};

export default Authentication;
