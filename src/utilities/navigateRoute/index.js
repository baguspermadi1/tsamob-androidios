import configs from '@configs';
import utilities from '@utilities';

const navigateRoute = {
  resetRoute: async ({navigation, routeName}) => {
    try {
      navigation.reset({
        index: 0,
        routes: [{name: routeName}],
      });
      return true;
    } catch (e) {
      return false;
    }
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
