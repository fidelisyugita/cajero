import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TextInput, TouchableRipple} from 'react-native-paper';
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {IcEyeOpen, IcEyeSlash} from '../../../assets/svgs';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import InputField2 from '../../../components/InputField.2';
import Spacer from '../../../components/Spacer';
import {colors} from '../../../styles';
import {s, vs} from '../../../utils/scale';

type FormLogin = {
  email: string;
  password: string;
  ownerEmail: string;
};

const schema = yup
  .object({
    email: yup.string().email().label('Email').required(),
    ownerEmail: yup.string().email().label('Owner Email').required(),
    password: yup.string().min(8).label('Password').required(),
  })
  .required();

function LoginFormStaff(): JSX.Element {
  const {t} = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState<boolean>();

  const {control, handleSubmit, setFocus} = useForm<FormLogin>({
    defaultValues: {
      email: '',
      ownerEmail: '',
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
            returnKeyType="next"
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
            onSubmitEditing={() => setFocus('ownerEmail')}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={16} />

      <Controller
        control={control}
        name="ownerEmail"
        render={({field: {onChange, ref, value}, fieldState: {error}}) => (
          <InputField2
            errorMessage={t(error?.message)}
            keyboardType="email-address"
            label={t('Owner Email')}
            placeholder={t('Owner Email')}
            ref={ref}
            returnKeyType="done"
            value={value}
            onChangeText={onChange}
          />
        )}
        rules={{
          required: true,
        }}
      />

      <Spacer height={32} />

      <Button size="large" onPress={handleSubmit(onSubmit)}>
        {t('Sign In')}
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
});

export default LoginFormStaff;
