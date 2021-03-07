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
};

export default Password;
