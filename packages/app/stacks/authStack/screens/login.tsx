import { Text, Box, Button, Center, FormControl, Heading, HStack, Input, Link, VStack, WarningOutlineIcon } from "native-base";
import React, { useState } from "react";
import { trpc } from "../../../trpc";
import { AuthNavProps } from "../authParamList";
import { StyleSheet, I18nManager as RNI18nManager, AsyncStorage } from "react-native";
import * as Updates from "expo-updates";
import { useTranslation } from "react-i18next";

type FieldErrors = {
                [x: string]: string[] | undefined;
                [x: number]: string[] | undefined;
                [x: symbol]: string[] | undefined;
            } | undefined;

export const Login = ({navigation, route} : AuthNavProps<'Login'>) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { t } = useTranslation();

    const loginMutation = trpc.useMutation('auth/login');

    const login = async () => {
        loginMutation.mutate({email: email, password: password});
        console.log("---------------------------------------------------");
        console.log("---------------------------------------------------");
        console.log(loginMutation);
        console.log("---------------------------------------------------");
        console.log("---------------------------------------------------");
        {/* if(loginMutation.error?.data){ */}
        {/*     let errs = loginMutation.error.data.zodErrors; */}
            {/* setFieldsErrors(errs); */}
            {/* console.log(errs); */}
            //}

        {/*  AsyncStorage.clear(); */}
        {/* RNI18nManager.allowRTL(true); */}
        {/* RNI18nManager.forceRTL(false); */}
        {/* await Updates.reloadAsync(); */}

    }

    const getEmailErrors = () => {
        let emailErrors = loginMutation.error 
            && loginMutation.error.data
            && loginMutation.error.data.zodErrors
            && loginMutation.error.data.zodErrors.email;
        if(emailErrors){
            return emailErrors;
        }
        return [];
    }

    const getPasswordErrors = () => {
        let passwordErrors = loginMutation.error 
            && loginMutation.error.data
            && loginMutation.error.data.zodErrors
            && loginMutation.error.data.zodErrors.password;
        if(passwordErrors){
            console.log("will return ", passwordErrors);
            return passwordErrors;
        }
            console.log("will return ",[]);
        return [];
    }
  
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>
        <Text>{RNI18nManager.isRTL? "rtl" : "ltr"}</Text>
        <Text>{JSON.stringify(loginMutation.error?.data?.zodErrors)}</Text>

        <VStack space={3} mt="5">
            <FormControl isInvalid={ getEmailErrors().length > 0 }>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={value => setEmail(value)}/>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" /> }>
                { t(getEmailErrors()[0]) }
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={ getPasswordErrors().length > 0  }>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={value => setPassword(value)}/>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" /> }>
                { t(getPasswordErrors()[0]) }
            </FormControl.ErrorMessage>
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" 
                disabled={loginMutation.isLoading}
                onPress={login}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
            }} onPress={() => navigation.navigate('SignUp')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};
