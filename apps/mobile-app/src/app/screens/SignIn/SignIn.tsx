import React, { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { useForm, Controller } from 'react-hook-form';
import { getProfileAction, signInAction } from '../../api/auth.action';
import { useFetch } from '../../hooks/use-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SignInRequestInterface,
  SignInResponseInterface,
  UserInterface,
} from '@domotica/shared/interfaces';
import { AuthContext } from '../../hooks/use-auth-context';
import TextField from '../../components/FormComponent/TextField';
import Button from '../../components/Button';

const SignIn = (): JSX.Element => {
  const { setUser } = useContext(AuthContext);
  const { handleSubmit, control, formState } = useForm<SignInRequestInterface>({
    defaultValues: { email: '', password: '' },
  });

  const signIn = useFetch<SignInResponseInterface>(signInAction);
  const getProfile = useFetch<UserInterface>(getProfileAction);

  useEffect(() => {
    (async () => {
      let auth = await AsyncStorage.getItem('auth');
      if (auth) {
        auth = JSON.parse(auth);
        const user = await getProfile.fatchData();
        setUser(user);
      }
    })();
  }, [getProfile, setUser]);

  const onSubmit = async (dataForm: SignInRequestInterface) => {
    const signInResponse = await signIn.fatchData(dataForm);

    if (signInResponse) {
      await AsyncStorage.setItem('auth', JSON.stringify(signInResponse));

      setUser(signInResponse.user);
    }
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
