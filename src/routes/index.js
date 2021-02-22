import configs from '@configs';
import {
  Login,
  LoginVerifikasiOTP,
  LupaPassword,
  LupaPasswordBerhasil,
  LupaPasswordEmail,
  LupaPasswordEmailLink,
  RegistrasiBuatAkun,
  RegistrasiBuatPassword,
  RegistrasiDataDiri,
  RegistrasiForm,
  RegistrasiNomorKendaraan,
  RegistrasiPendaftaranBerhasil,
  StackHome,
  StackMenu,
  StackNotifikasi,
  StackProfile,
  StackRequest,
} from '@pages';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const StackScreen = [
  {name: configs.screens.regist.buatAkun, component: RegistrasiBuatAkun},
  {
    name: configs.screens.regist.noKendaraan,
    component: RegistrasiNomorKendaraan,
  },
  {name: configs.screens.regist.form, component: RegistrasiForm},
  {name: configs.screens.regist.dataDiri, component: RegistrasiDataDiri},
  {
    name: configs.screens.regist.buatPassword,
    component: RegistrasiBuatPassword,
  },
  {
    name: configs.screens.regist.daftarBerhasil,
    component: RegistrasiPendaftaranBerhasil,
  },
  {name: configs.screens.login.main, component: Login},
  {name: configs.screens.login.verifikasi, component: LoginVerifikasiOTP},
  {name: configs.screens.forgotPwd.email, component: LupaPasswordEmail},
  {name: configs.screens.forgotPwd.emailLink, component: LupaPasswordEmailLink},
  {name: configs.screens.forgotPwd.main, component: LupaPassword},
  {name: configs.screens.forgotPwd.berhasil, component: LupaPasswordBerhasil},
  {name: configs.screens.stack.main, component: StackMenu},
  {name: configs.screens.stack.home, component: StackHome},
  {name: configs.screens.stack.request, component: StackRequest},
  {name: configs.screens.stack.notifikasi, component: StackNotifikasi},
  {name: configs.screens.stack.profile, component: StackProfile},
];

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={configs.screens.login.main}
        screenOptions={{headerShown: false}}>
        {StackScreen.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
