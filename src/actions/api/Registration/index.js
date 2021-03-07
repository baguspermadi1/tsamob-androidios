import redux from '@actions/constants/redux';
import rest from '@actions/constants/rest';
import template from '../template';

const Registration = {
  postCheckRegistration: ({phoneNumber, licensePlate}) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.REGISTRATION.CHECK,
      url: rest.registration.check,
      body: {
        PhoneNumber: phoneNumber,
        LicensePlate: licensePlate,
      },
    });
  },
  postVerifyRegistration: ({
    title,
    dateOfBirth,
    userCode,
    name,
    username,
    email,
    phoneNumber,
    roleID,
    password,
  }) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.REGISTRATION.VERIFY_REGISTRATION,
      url: rest.registration.verifyRegistration,
      body: {
        Title: title,
        DateOfBirth: dateOfBirth,
        UserCode: userCode,
        Name: name,
        Username: username,
        Email: email,
        PhoneNumber: phoneNumber,
        RoleID: roleID,
        Password: password,
      },
    });
  },
};

export default Registration;
