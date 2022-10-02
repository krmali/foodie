import { Text, Box, Button, Center, FormControl, Heading, HStack, Input, Link, VStack } from "native-base";
import { useState } from "react";
import { trpc } from "../../../trpc";
import { AuthNavProps } from "../authParamList";

export const Login = ({navigation, route} : AuthNavProps<'Login'>) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginMutation = trpc.useMutation('auth/login');

    const login = () => {
         
    }
  
  return <Center w="100%">
      <Bmx safeArea p="2" py="8" w="90%" maxW="290">
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

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={value => setEmail(value)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={login}>
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
