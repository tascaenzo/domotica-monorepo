import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import TextField from '../../components/FormComponent/TextField';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import Button from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { signInAction } from '../../api/user.action';
import { useFetch } from '../../hooks/use-fetch';
import {
  SignInRequestInterface,
  SignInResponseInterface,
} from '@domotica/shared/interfaces';

const SignIn = (): JSX.Element => {
  const { fatchData, data } = useFetch<SignInResponseInterface>(signInAction);
  const { handleSubmit, control, formState } = useForm<SignInRequestInterface>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (dataForm: SignInRequestInterface) => {
    const t = await fatchData(dataForm);
    console.log(t);
  };

  return (
    <View>
      <View style={styles.circleContainer} />
      <Text style={styles.titleLogin}>Login</Text>
      <Text style={styles.titleWelcome}>Benvenuto</Text>

      <SafeAreaView style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              error={formState.errors.email?.message}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Username"
              icon={<Feather name="user" size={20} color="#606060" />}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              error={formState.errors.password?.message}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
              placeholder="Password"
              icon={
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={24}
                  color="#606060"
                />
              }
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <View style={{ padding: 25 }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            width={'100%'}
            title="Accedi"
            color="#ef6c00"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignIn;
