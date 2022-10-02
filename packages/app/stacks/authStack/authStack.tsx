import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthParamList } from './authParamList';
import { Login } from './screens/login'
import { SignUp } from './screens/sign-up';


const NativeStack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = ({}) => {
    return(
        <NativeStack.Navigator>
            <NativeStack.Screen
                name="Login"
                component={Login}
                options={{title: "login"}}
            />
            <NativeStack.Screen
                name="SignUp"
                component={SignUp}
                options={{title: "sign up"}}
            />
        </NativeStack.Navigator>
    );

}
