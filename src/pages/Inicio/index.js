import React from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import { Estilos } from '../../styles/Estilo';
// import * as Anima from 'react-native-animatable'

const Inicio = ({ navigation }) => {
    return (
        <View style={Estilos.view}>
            <Text style={Estilos.titulo}>Safe Guard</Text>
            <Image source={require('../../assets/Logo.png')} style={Estilos.imagem}
            />
                <Text style={Estilos.titulo}>Segurança em  primeiro lugar</Text>
                <Text style={Estilos.subTitulo}>Somos uma empresa de {'\n'} segurança que se preocupa {'\n'} com a distribuição de EPI's.</Text>
                <TouchableOpacity 
                    style={Estilos.botaoEscuro}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={Estilos.botaoEscuroTexto}> Login </Text>
                </TouchableOpacity>
        </View>
    )
}



export default Inicio