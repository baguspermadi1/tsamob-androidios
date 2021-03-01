import redux from '../../constants/redux';
import rest from '../../constants/rest';
import template from '../template';

const Login = {
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
      headers: {
        Authorization: 'Bearer Token'
      }
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
};

export default Login;
