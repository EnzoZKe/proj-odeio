import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import { Estilos } from '../../styles/Estilo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'


const Home = ({ navigation }) => {
    //const [dadosNotif, setDadosNotif] = useState
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [login, setLogin] = useState('')

    const verificarLoginRealizado = async () => {
        let dadosLogado = await AsyncStorage.getItem('dadosUserLogado');
        if (dadosLogado) {
            dadosLogado = JSON.parse(dadosLogado)
            setLogin(dadosLogado.usuario)
            //alert(`Usuário ${dadosLogado.nome} (${dadosLogado.cargo}), está logado`)
            setNome(dadosLogado.nome)
            setCPF(dadosLogado.cpf)
            console.log("Dados",dadosLogado);
        }
    }

    useEffect(() => {
        verificarLoginRealizado();
    }, []);

    const botaoLogout = async () => {
        await AsyncStorage.removeItem('dadosUserLogado');
        navigation.navigate('Login');
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

    // const carregarNotificacao = async (idUsuarioLogado) =>{
    //     try{
    //         const resposta = await fetch(`http://192.168.0.110:5000/notificacoes/obterNotificacoes/${idUsuarioLogado}`)
    //             const dados = await resposta.json()
    //             setDadosNotif(dados)

    //             if(dados.length > 0){
    //                 criarNotificacaoLocal()
    //             }
    //     }catch(error){
    //         console.error('Erro ao buscar notificação', error);
    //     }
    // }


    // const criarNotificacaoLocal = async () =>{
    //     await Notifications.scheduleNotificationAsync({
    //         content:{
    //             title: 'Aplicativo Base Projeto',
    //             body: 'Há novas notificações para você',
    //             data:{}
    //         },
    //         trigger: {   
    //             seconds: 5
    //         }
    //     })
    // }

    return (
        <View style={Estilos.view}>
            <ScrollView>
                <View>
                    <Text style={Estilos.titulo}>Principal</Text>
                    <Text style={Estilos.texto}>CPF: {cpf}</Text>
                    <Text style={Estilos.texto}>Nome: {nome}</Text>
                    <TouchableOpacity
                        style={Estilos.botaoEscuro}
                        onPress={() => navigation.navigate('Cadastrar-EPI')}>
                        <Text style={Estilos.botaoEscuroTexto}>Cadastrar EPI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Estilos.botaoEscuro}>
                        <Text style={Estilos.botaoEscuroTexto}>Retirar EPI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Estilos.botaoEscuro}
                        onPress={() => navigation.navigate('Cadastrar-Colaborador')}
                    >
                        <Text style={Estilos.botaoEscuroTexto}>Cadastrar Colaborador</Text>
                    </TouchableOpacity>

                </View>


                {/* <View>
                    <Text style={Estilos.titulo}>Notificações</Text>
                    <View>
                        <Text style={Estilos.subTitulo}>EPIs Vencidos</Text>
                        <View style={Estilos.caixa}>
                            <View style={Estilos.caixaNotificacao}>
                                <Text style={{textAlign:'center', fontWeight: 'bold'}}> Notificações: </Text>
                                <FlatList
                                    data={dadosNotif}
                                    renderItem={exibirItensLista}
                                    keyExtractor={(item) => item.id_notificacao.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </View> */}
                <TouchableOpacity style={Estilos.botaoVermelho} onPress={botaoLogout}>
                    <Text style={Estilos.botaoEscuroTexto}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Home;
