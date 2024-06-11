import React, { useState, useEffect } from "react"
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Estilos } from '../../styles/Estilo'
import { urlWS } from '../../config'
import { Checkbox } from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'

//! ELE TA LENDO O nome: json[0].nome COMO UNDEFINED QUANDO FAZ LOGIN COMO COLABORADOR!!!!!

const Login = ({ navigation }) => {

    const [tipoAcesso, setTipoAcesso] = useState('Supervisor')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemLogin, setMensagemLogin] = useState('')
    const [usuario, setUsuario] = useState('')
    const [permanecerConectado, setPermanecerConectado] = useState(false)


    const confLogin = async () => {
        try {
            const URL = `${urlWS}/colaboradores/login`

            const respnse = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cpf: cpf,
                    senha: senha,
                    cargo: tipoAcesso
                })
            })

            if (!respnse.ok) {
                setMensagemLogin('Usuario não encontrado / inexistente')
                return
            }

            const json = await respnse.json()
            console.log("json",json)
            if (json.status == "error") {
                setMensagemLogin('Usuario ou senha Invalidos')
            } else {
                // navigation.navigate('MenuNavegacao', { cargo: tipoAcesso })
                await AsyncStorage.setItem('dadosUserLogado', JSON.stringify({
                    nome: json[0].nome,
                    cpf: cpf,
                    cargo: tipoAcesso,
                    permanecerConectado: permanecerConectado,
                    id_colaborador: json[0].id_colaborador
                }))
                navigation.navigate('MenuNavegacao', { cargo: tipoAcesso })
                
            }
            
        } catch (error) {
            console.log('erro ao realizar login:', error);
        }

    }

    const verificarLogin = async () => {
        let dadosLogado = await AsyncStorage.getItem('dadosUserLogado')
        if (dadosLogado) {
            dadosLogado = JSON.parse(dadosLogado)

            if (dadosLogado.permanecerConectado) {
                navigation.navigate('MenuNavegacao', { cargo: dadosLogado.cargo })
            }
        }
        // console.log(json)
    }

    useEffect(() => {
        verificarLogin();
    }, [])

    return (

        <View style={Estilos.view}>
            <Text style={Estilos.titulo}>Bem vindo de volta!</Text>
            <View >
                <Picker
                    style={Estilos.picker}
                    selectedValue={tipoAcesso}
                    onValueChange={setTipoAcesso}>
                    <Picker.Item label="Supervisor" value="Supervisor" />
                    <Picker.Item label="Colaborador" value="Colaborador" />
                </Picker>
            </View>

            <View>
                <Text style={Estilos.textoEmCimaInput}>CPF</Text>
                <TextInput placeholder='Entre seu CPF'
                    value={cpf}
                    onChangeText={setCpf}
                    style={Estilos.inputs}
                />
            </View>

            <View>
                <Text style={Estilos.textoEmCimaInput}>Senha</Text>
                <TextInput placeholder='Entre sua senha'
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                    style={Estilos.inputs}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                    value={permanecerConectado}
                    onValueChange={setPermanecerConectado}
                />
                <Text> Permanecer conectado </Text>
            </View>
            <Text>{mensagemLogin}</Text>

            <TouchableOpacity
                onPress={confLogin} style={Estilos.botaoEscuro}>
                <Text style={Estilos.botaoEscuroTexto}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}



export default Login