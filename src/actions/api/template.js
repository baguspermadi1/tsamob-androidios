import redux from '@actions/constants/redux';
import utilities from '@utilities';
import api from '.';

const template = {
  fetchAPI: ({method, url, reduxAction, body = {}, headers}) => {
    const fetchRedux = `FETCH_${reduxAction}`;
    const receiveRedux = `RECEIVE_${reduxAction}`;
    return async (dispatch) => {
      dispatch({type: fetchRedux});
      try {
        const response = await fetch(encodeURI(url), {
          credentials: 'include',
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(body),
        });
        const responseJSON = await response.json();
        dispatch({
          type: receiveRedux,
          payload: responseJSON,
        });
        return Promise.resolve(responseJSON);
      } catch (error) {
        dispatch({
          type: redux.API_SERVER_ERROR,
          payload: error,
        });
        return Promise.reject(error);
      }
    };
  },
  fetchAPIBearer: ({method, url, reduxAction, body = {}, bearer}) => {
    const fetchRedux = `FETCH_${reduxAction}`;
    const receiveRedux = `RECEIVE_${reduxAction}`;
    return async (dispatch) => {
      dispatch({type: fetchRedux});
      try {
        const response = await fetch(encodeURI(url), {
          credentials: 'include',
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
          body: JSON.stringify(body),
        });
        const responseJSON = await response.json();
        dispatch({
          type: receiveRedux,
          payload: responseJSON,
        });
        return Promise.resolve(responseJSON);
      } catch (error) {
        dispatch({
          type: redux.API_SERVER_ERROR,
          payload: error,
        });
        return Promise.reject(error);
      }
    };
  },
  fetchAPIAccess: ({
    method,
    url,
    reduxAction,
    body = {},
    headers,
    accessToken,
    navigation,
  }) => {
    return async (dispatch) => {
      try {
        let authorizationBearer = '';
        const checkAccessTokenJSON = await dispatch(
          api.AccessToken.postCheckToken({accessToken: accessToken}),
        );
        if (!checkAccessTokenJSON.data.valid) {
          const refreshTokenJSON = await dispatch(
            api.AccessToken.postRefreshToken({accessToken: accessToken}),
          );
          const {message, success} = refreshTokenJSON;
          if (!success) {
            dispatch({type: redux.RESET_REDUX});
            await utilities.navigateRoute.resetToLogin({
              navigation: navigation,
            });
            throw Error(message);
          } else {
            authorizationBearer = refreshTokenJSON.data.access_token;
          }
        } else {
          authorizationBearer = accessToken;
        }
        const apiResponse = await dispatch(
          template.fetchAPI({
            method: method,
            headers: {
              Authorization: `Bearer ${authorizationBearer}`,
              ...headers,
            },
            url: url,
            reduxAction: reduxAction,
            body: body,
          }),
        );
        return Promise.resolve(apiResponse);
      } catch (error) {
        dispatch({
          type: redux.API_SERVER_ERROR,
          payload: error,
        });
        return Promise.reject(error);
      }
    };
  },
};

export default template;
