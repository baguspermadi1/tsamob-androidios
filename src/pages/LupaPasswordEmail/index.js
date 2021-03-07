import api from '@actions/api';
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
import {useDispatch, useSelector} from 'react-redux';

const {width: screenWidth} = Dimensions.get('screen');

const LupaPasswordEmail = ({navigation}) => {
  const dispatch = useDispatch();
  const loadingRedux = useSelector((state) => state.loading);

  const [isBtnDisabled, setisBtnDisabled] = useState(true);
  const [isErrorEmail, setisErrorEmail] = useState(false);
  const [infoErrorEmail, setinfoErrorEmail] = useState(false);
  const [email, setemail] = useState('');
  const [errorCode, seterrorCode] = useState('');

  useEffect(() => {
    if (email) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [email]);

  const sendEmail = async () => {
    await dispatch(
      api.Password.postForgotPassword({
        email: email,
      }),
    )
      .then(async (res) => {
        let {error_code, success, errors} = res;

        if (success) {
          navigation.navigate(configs.screens.forgotPwd.emailLink, {
            email: email,
          });
        } else {
          seterrorCode(error_code);
          if (error_code === 'inline_validations') {
            errors.map((item) => {
              let errorMessages = item.messages.join('\n');

              if (item.field === 'Email') {
                setisErrorEmail(true);
                setinfoErrorEmail(errorMessages);
              }
            });
          }
        }
      })
      .catch((e) => {
        return console.log('Catch Error', e.toString());
      });
  };

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <Loading isLoading={loadingRedux} />
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
            errorInfo={infoErrorEmail}
            focusAfterError={() => {
              setinfoErrorEmail(false);
              setisErrorEmail(false);
            }}
          />
        </ScrollView>
        <View style={styles.containerBottom}>
          <Button
            text={'Selanjutnya'}
            disabled={isBtnDisabled}
            onPress={() => {
              Keyboard.dismiss();
              sendEmail();
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
