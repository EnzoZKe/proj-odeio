import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Estilos } from '../../styles/Estilo';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { urlWS } from '../../config';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true
    })
})

const Home = ({ navigation, route }) => {
    const [dadosNotif, setDadosNotif] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [login, setLogin] = useState('')
    const [epiVinculado, setEpiVinculado] = useState([]);
    const [colaboradorId, setColaboradorId] = useState(0)

    const verificarLoginRealizado = async () => {
        let dadosLogado = await AsyncStorage.getItem('dadosUserLogado');
        if (dadosLogado) {
            dadosLogado = JSON.parse(dadosLogado)
            setLogin(dadosLogado.usuario)
            //alert(`Usuário ${dadosLogado.nome} (${dadosLogado.cargo}), está logado`)
            setNome(dadosLogado.nome)
            setCPF(dadosLogado.cpf)
            setColaboradorId(dadosLogado.id_colaborador)
            console.log("id colab>>", dadosLogado.id_colaborador);
            console.log("Dados", dadosLogado);
        }
    }

    const exibirItemLista = ({ item }) => {
        return (
            <View style={{
                marginVertical: 5, padding: 10,
                borderColor: '#4A708B', borderWidth: 1,
                backgroundColor: '#E0FFFF'
            }}>
                <Text>{item.descricao}</Text>
            </View>
        )
    }

    const carregarNotificacao = async (dadosLogado) => {
        try {
            // const resposta = await fetch(`http://192.168.0.110:5000/notificacoes/obterNotificacoes/${idUsuarioLogado}`)
            // const dados = await resposta.json()
            // setDadosNotificacao(dados)
            console.log("dados other func",dadosLogado);
            let vinc = await fetch(`${urlWS}/vinculacoes/obter/${dadosLogado.id_colaborador}`);
            let finalizar = await vinc.json();
            setEpiVinculado(finalizar);
            console.log(epiVinculado)
        } catch (error) {
            console.error('Erro ao buscar notificação', error);
        }
    }

    // const verificarLogin = async () => {
    //     let dadosLogado = await AsyncStorage.getItem('dadosUserLogado')
    //     if (dadosLogado) {
    //         dadosLogado = JSON.parse(dadosLogado)
    //         setCpf(dadosLogado.tipoAcesso)
    //         carregarNotificacao(dadosLogado.id_usuario)
    //     }
    // }

    // const criarNotificacaoLocal = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: 'Aplicativo Base Projeto',
    //             body: 'Há novas notificações para você',
    //             data: {}
    //         },
    //         trigger: {
    //             seconds: 5
    //         }
    //     })
    // }

    useEffect(() => {
        verificarLoginRealizado(), carregarNotificacao()
    }, []);

    const botaoLogout = async () => {
        await AsyncStorage.removeItem('dadosUserLogado');
        navigation.navigate('Login');
    }

    return (

        <View style={Estilos.view}>
            <Text style={Estilos.titulo}>Home: O que você quer fazer?</Text>
            <Text style={Estilos.texto}>CPF: {cpf}</Text>
            <Text style={Estilos.texto}>Nome: {nome}</Text>
            <ScrollView>
                <View>
                    <Text style={Estilos.titulo}>Notificações</Text>
                    <FlatList
                        data={dadosNotif}
                        renderItem={exibirItemLista}
                        keyExtractor={(item) => item.id_notificacao.toString()} />
                </View>
                <TouchableOpacity style={Estilos.botaoVermelho} onPress={botaoLogout}>
                    <Text style={Estilos.botaoEscuroTexto}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Home