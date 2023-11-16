import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TextInput, TouchableRipple} from 'react-native-paper';
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {IcEyeOpen, IcEyeSlash, IcGoogle} from '../../../assets/svgs';
import Button from '../../../components/Button';
import ConditionalRender from '../../../components/ConditionalRender';
import InputField from '../../../components/InputField';
import InputField2 from '../../../components/InputField.2';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';

type FormLogin = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

const schema = yup
  .object({
    confirmPassword: yup.string().min(8).label('Confirm Password').required(),
    email: yup.string().email().label('Email').required(),
    fullName: yup.string().min(3).label('Full Name').required(),
    password: yup.string().min(8).label('Password').required(),
  })
  .required();

function SignUpForm(): JSX.Element {
  const {t} = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState<boolean>();

  const {control, handleSubmit, setFocus} = useForm<FormLogin>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      fullName: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormLogin) => {
    console.log(data);
  };

  const IcEye = passwordVisible ? IcEyeOpen : IcEyeSlash;

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="fullName"
        render={({field: {onChange, ref, value}, fieldState: {error}}) => (
          <InputField2
            errorMessage={t(error?.message)}
            label={t('Full Name')}
            placeholder={t('Full Name')}
            ref={ref}
            returnKeyType="next"
            value={value}
            onChangeText={onChange}
            onSubmitEditing={() => setFocus('email')}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={16} />

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
          <>
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
            <ConditionalRender condition={!error?.message}>
              <Text color="neutral.c500" textStyle="bodyTextMedium">
                {t(
                  'Password must contain at least 8 characters including both numbers and letters.',
                )}
              </Text>
            </ConditionalRender>
          </>
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={16} />

      <Controller
        control={control}
        name="confirmPassword"
        render={({field: {onChange, ref, value}, fieldState: {error}}) => (
          <InputField2
            errorMessage={t(error?.message)}
            label={t('Confirm Password')}
            placeholder={t('Confirm Password')}
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

      <Spacer height={32} />

      <Button size="large" onPress={handleSubmit(onSubmit)}>
        {t('Sign Up')}
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
        {t('Sign Up with Google')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: vs(56),
  },
  inputIcon: {
    marginTop: vs(16),
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

export default SignUpForm;
