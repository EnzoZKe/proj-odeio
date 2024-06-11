import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text } from 'react-native';

import Inicio from '../Inicio'
import Login from '../Login'
import MenuNavegacao from '../MenuNavegacao'
import CadEPISELF from '../CadEPI-itself';
import CadColab from '../CadColab'
import CadEPI from '../CadEPI';
import CadColabSELF from '../CadColab-itself'
import Vinculacao from '../Vinculacao';

const Stack = createNativeStackNavigator()

const RotasTelas = () => {
    return (
        <NavigationContainer>
            <StatusBar/>
            <Stack.Navigator>
                <Stack.Screen name='Inicio' component={Inicio} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='MenuNavegacao' component={MenuNavegacao} options={{ headerShown: false }} />
                <Stack.Screen name='EPIs-mostrar' component={CadEPI}/>
                <Stack.Screen name='Cadastrar-EPI' component={CadEPISELF} />
                <Stack.Screen name='Colaboradores' component={CadColab} />
                <Stack.Screen name='Cadastrar-Colaborador' component={CadColabSELF}/>
                <Stack.Screen name='Vincular-EPI' component={Vinculacao}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RotasTelas