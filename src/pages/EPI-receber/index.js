import React from 'react'
import { View, Text, Button, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Estilos } from '../../styles/Estilo';


const EPI = ({ Navigation }) => {
    return (
        <View style={Estilos.view}>
            <ScrollView>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20
                }}>
                    <Text style={Estilos.titulo}>Óculos de proteção</Text>
                    <Image source={{ uri: 'https://www.epiguardiao.com.br/img/produtos/protecao-facial-e-visual/oculos-condor-danny.png' }} style={Estilos.imagemEPI} />
                    <Text style={Estilos.subTitulo}>Vencimento: {'\n'}
                        30/02/1969</Text>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20
                }}>
                    <Text style={Estilos.subTitulo}>É um óculos. Você coloca no rosto e ele e protege, não tem muito o que descrever</Text>
                    <TouchableOpacity style={Estilos.botaoEscuro}>
                        <Text style={Estilos.botaoEscuroTexto}>Recebido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Estilos.botaoVermelho}>
                        <Text style={Estilos.botaoEscuroTexto}>Não recebido</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


export default EPI