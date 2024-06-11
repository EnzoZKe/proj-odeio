import React from 'react'
import {View, Text} from 'react-native'
import { Estilos } from '../../styles/Estilo';

const Notificacao = ({Navigation}) =>{
    return(
        <View>
            <Text>Notificacao</Text>
            <View>
                <Text style={Estilos.titulo}>EPI's Comprados</Text>
            </View>
            <View>
                <Text style={Estilos.titulo}>EPI's receber</Text>
            </View>
        </View>
    )
}

export default Notificacao