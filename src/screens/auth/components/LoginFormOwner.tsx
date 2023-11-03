import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {IcEyeOpen, IcEyeSlash, IcGoogle} from '../../../assets/svgs';
import Button from '../../../components/Button';
import InputField2 from '../../../components/InputField.2';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {hideLoading, showLoading} from '../../../helpers/loadingHelper';
import {useLoginMutation} from '../../../services/authApi';
import {setIsSignIn} from '../../../store/sessionStore';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';

type FormLogin = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().label('Email').required(),
    password: yup.string().min(8).label('Password').required(),
  })
  .required();

function LoginFormOwner(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState<boolean>();

  const {control, handleSubmit, setFocus} = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [loginMutation] = useLoginMutation();

  const onSubmit = async (data: FormLogin) => {
    try {
      showLoading();
      const result = await loginMutation(data);
    } catch (error) {
    } finally {
      dispatch(setIsSignIn(true));
      hideLoading();
    }
  };

  const IcEye = passwordVisible ? IcEyeOpen : IcEyeSlash;

  return (
    <View style={styles.formContainer}>
      <Spacer height={32} />
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, ref, value}, fieldState: {error}}) => (
          <InputField2
            errorMessage={t(error?.message)}
            keyboardType="email-address"
            label={t('Email')}
            placeholder={t('Email')}
            ref={ref}
            returnKeyType="next"
            value={value}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('password')}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={16} />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, ref, value}, fieldState: {error}}) => (
          <InputField2
            errorMessage={t(error?.message)}
            label={t('Password')}
            placeholder={t('Password')}
            ref={ref}
            returnKeyType="done"
            secureTextEntry={!passwordVisible}
            value={value}
            right={
              <TouchableRipple onPress={() => setPasswordVisible(v => !v)}>
                <IcEye
                  color={colors.neutral.c600}
                  height={s(24)}
                  width={s(24)}
                />
              </TouchableRipple>
            }
            onChangeText={onChange}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={16} />

      <Button
        containerStyle={globalStyles.selfStart}
        size="medium"
        variant="link">
        {t('Forgot Password?')}
      </Button>

      <Spacer height={32} />

      <Button size="large" onPress={handleSubmit(onSubmit)}>
        {t('Sign In')}
      </Button>

      <View style={styles.orWrapper}>
        <View style={styles.line} />
        <Text color="neutral.c600" textStyle="bodyTextLarge">
          {t('Or')}
        </Text>
        <View style={styles.line} />
      </View>

      <Button
        left={<IcGoogle height={s(24)} width={s(24)} />}
        size="large"
        variant="secondary">
        {t('Sign In with Google')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: vs(56),
  },
  line: {
    backgroundColor: colors.neutral.c300,
    height: 1,
    width: vs(120),
  },
  orWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
    justifyContent: 'center',
    marginVertical: s(12),
  },
});

export default LoginFormOwner;
