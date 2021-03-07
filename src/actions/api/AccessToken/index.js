import redux from '@actions/constants/redux';
import rest from '@actions/constants/rest';
import template from '../template';

const AccessToken = {
  postCheckToken: ({accessToken}) => {
    return template.fetchAPIBearer({
      method: 'POST',
      reduxAction: redux.AUTHENTICATION.CHECK_TOKEN,
      url: rest.authentication.checkToken,
      bearer: accessToken,
    });
  },
  postRefreshToken: ({accessToken}) => {
    return template.fetchAPIBearer({
      method: 'POST',
      reduxAction: redux.AUTHENTICATION.REFRESH_TOKEN,
      url: rest.authentication.refreshToken,
      bearer: accessToken,
    });
  },
};

export default AccessToken;
