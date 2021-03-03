import redux from '../../constants/redux';
import rest from '../../constants/rest';
import template from '../template';

const Authentication = {
  postLoginCustomer: ({email, password}) => {
    return template.fetchAPI({
      method: 'POST',
      fetchRedux: redux.AUTHENTICATION.LOGIN.FETCH,
      receiveRedux: redux.AUTHENTICATION.LOGIN.RECEIVE,
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
      fetchRedux: redux.AUTHENTICATION.OTP.FETCH,
      receiveRedux: redux.AUTHENTICATION.OTP.RECEIVE,
      url: rest.authentication.otp,
      body: {
        LoginToken: loginToken,
        OtpCode: otpCode,
      },
    });
  },
  postLogout: ({accessToken}) => {
    return template.fetchAPI({
      method: 'POST',
      fetchRedux: redux.AUTHENTICATION.LOGOUT.FETCH,
      receiveRedux: redux.AUTHENTICATION.LOGOUT.RECEIVE,
      url: rest.authentication.logout,
      headers: {Authorization: `Bearer ${accessToken}`},
    });
  },
};

export default Authentication;
