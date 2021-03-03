import {
  BackNonLogin,
  Button,
  HeaderNonLogin,
  Loading,
  TextInput,
} from '@components';
import configs from '@configs';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width: screenWidth} = Dimensions.get('screen');

const LupaPasswordEmail = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);
  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [isErrorEmail, setisErrorEmail] = useState(false);
  const [email, setemail] = useState('');

  useEffect(() => {
    if (email) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [email]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.body}
        enabled>
        <BackNonLogin navigation={navigation} />
        <HeaderNonLogin
          navigation={navigation}
          title={'Atur Ulang Kata Sandi'}
          description={'Masukan email untuk mengatur ulang kata sandi anda'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Loading isLoading={isLoading} />
          <TextInput
            placeholder={'Email Anda'}
            placeholderActive={'Contoh : johndoe@mail.com'}
            style={{marginBottom: RFValue(8)}}
            valueText={email}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              setemail(text);
            }}
            isError={isErrorEmail}
            errorInfo={false}
            focusAfterError={() => setisErrorEmail(false)}
          />
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Selanjutnya'}
            disabled={isBtnDisabled}
            onPress={() => {
              Keyboard.dismiss();
              setisLoading(true);
              setisErrorEmail(true);
              setTimeout(() => {
                setisLoading(false);
                navigation.navigate(configs.screens.forgotPwd.emailLink, {
                  email: email,
                });
              }, 1000);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: configs.colors.neutral.Bluish.base,
    padding: RFValue(16),
    flex: 1,
  },
  containerBottom: {
    marginTop: RFValue(8),
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

export default LupaPasswordEmail;
