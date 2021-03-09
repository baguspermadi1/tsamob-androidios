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
    name,
    email,
    phoneNumber,
    password,
    licensePlate,
    company,
  }) => {
    return template.fetchAPI({
      method: 'POST',
      reduxAction: redux.REGISTRATION.VERIFY_REGISTRATION,
      url: rest.registration.verifyRegistration,
      body: {
        Company: company,
        LicensePlate: licensePlate,
        Title: title,
        Name: name,
        DateOfBirth: dateOfBirth,
        PhoneNumber: phoneNumber,
        Email: email,
        Password: password,
      },
    });
  },
};

export default Registration;
