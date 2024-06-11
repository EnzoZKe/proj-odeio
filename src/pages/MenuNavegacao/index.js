import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Estilos } from '../../styles/Estilo';
import Home from '../Home';
import EPIReceber from '../EPI-receber'
import CadEPI from '../CadEPI'
import HomeColab from '../HomeColab';
import CadColab from '../CadColab'

import { MaterialIcons, FontAwesome6, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const MenuNavegacao = ({ route }) => {
    return (
        <Tab.Navigator>
            {
                route.params.cargo == 'Supervisor' ? <Tab.Screen options={{tabBarIcon:({size, color}) => (<MaterialIcons name="home" size={24} color="black" />), headerShown: false}} name='Home' component={Home}/> :
                <Tab.Screen options={{tabBarIcon:({size, color}) => (<MaterialIcons name="home" size={24} color="black" />), headerShown: false}} name='Home Colaborador' component={HomeColab} />
            }

            {route.params.cargo == 'Colaborador' ? <Tab.Screen options={{tabBarIcon:({size, color}) => (<FontAwesome6 name="helmet-safety" size={24} color="black" />), headerShown: false}} name='Receber EPI' component={EPIReceber} /> : null}

            {route.params.cargo == 'Supervisor' ? <Tab.Screen options={{tabBarIcon:({size, color}) => (<FontAwesome6 name="helmet-safety" size={24} color="black" />), headerShown: false}} name='EPIs' component={CadEPI} /> : null}

            {route.params.cargo == 'Supervisor' ? <Tab.Screen options={{tabBarIcon:({size, color}) => (<FontAwesome name="user-plus" size={24} color="black" />), headerShown: false}} name='Cadastrar Colaborador' component={CadColab}/> : null}
        </Tab.Navigator>
    )
}

export default MenuNavegacao