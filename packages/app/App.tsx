import React, { useState } from "react";
import {
    Text,
    Link,
    HStack,
    Center,
    Heading,
    Switch,
    useColorMode,
    NativeBaseProvider,
    extendTheme,
    VStack,
    Box,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from "./stacks/authStack/authStack";
import './i18n';

// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
    interface ICustomTheme extends MyThemeType {}
}

const client = new QueryClient();

export default function App(){
    const [trpcClient] = useState(() => 
        trpc.createClient({
            url: "http://192.168.1.23:8080/trpc",
        })
    );

    return(
        <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
                    <AppContent></AppContent>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

const Stack = createNativeStackNavigator();

function AppContent() {
    {/* const hello = trpc.useQuery(["hello"]); */}
    const hello = trpc.useQuery(['hello']);
    return(
        <NativeBaseProvider>
            <NavigationContainer>
                <AuthStack/>
            </NavigationContainer>
        </NativeBaseProvider>

    );
}

function AppContent1() {
    return (
        <>
        <NativeBaseProvider>
            <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
    >
        <VStack space={5} alignItems="center">
            <NativeBaseIcon />
            <Heading size="lg">Welcome to NativeBase</Heading>
            <HStack space={2} alignItems="center">
                <Text>Edit</Text>
                <Box
        _web={{
            _text: {
                fontFamily: "monospace",
                    fontSize: "sm",
            },
        }}
        px={2}
        py={1}
        _dark={{ bg: "blueGray.800" }}
        _light={{ bg: "blueGray.200" }}
    >
        App.js
    </Box>
    <Text>and save to reload.</Text>
</HStack>
<Link href="https://docs.nativebase.io" isExternal>
    <Text color="primary.500" underline fontSize={"xl"}>
        Learn NativeBase
    </Text>
</Link>
<ToggleDarkMode />
        </VStack>
    </Center>
</NativeBaseProvider>
</>
  );
}

// Color Switch Component
function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
            colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        />
        <Text>Light</Text>
    </HStack>
    );
}
