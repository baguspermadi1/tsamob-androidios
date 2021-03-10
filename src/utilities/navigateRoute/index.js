import configs from '@configs';
import utilities from '@utilities';

const navigateRoute = {
  resetRoute: ({navigation, routeName, params = {}}) => {
    navigation.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    });
  },
  resetToLogin: async ({navigation}) => {
    await utilities.asyncstorage.clearStorage();
    navigation.reset({
      index: 0,
      routes: [{name: configs.screens.login.main}],
    });
  },
};

export default navigateRoute;
