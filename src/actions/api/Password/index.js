import redux from '@actions/constants/redux';
import rest from '@actions/constants/rest';
import template from '../template';

const Password = {
  postForgotPassword: ({email}) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.PASSWORD.FORGOT,
      url: rest.password.forgot,
      body: {
        Email: email,
      },
    });
  },
  postResetPassword: ({resetToken, newPassword}) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.PASSWORD.RESET,
      url: rest.password.reset,
      body: {
        ResetToken: resetToken,
        NewPassword: newPassword,
      },
    });
  },
  postChangePassword: ({oldPassword, newPassword, navigation, accessToken}) => {
    return template.fetchAPIAccess({
      method: 'POST',
      reduxAction: redux.PASSWORD.CHANGE,
      url: rest.password.change,
      body: {
        OldPassword: oldPassword,
        NewPassword: newPassword,
      },
      accessToken: accessToken,
      navigation: navigation,
    });
  },
};

export default Password;
