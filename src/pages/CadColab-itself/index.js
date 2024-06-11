import React, { useState, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, TextInput, Text, Image, Button, TouchableOpacity, ScrollView } from "react-native"
import { Estilos } from '../../styles/Estilo'
import { Picker } from '@react-native-picker/picker'
import { urlWS } from '../../config'

const CadColabISELF = ({ navigation, route }) => {
    const [nomeColab, setNomeColab] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [setor, setSetor] = useState('')
    const [cpf, setCpf] = useState('')
    const [cargo, setCargo] = useState('Colaborador')
    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [nr_casa, setNRCasa] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [PFP, setPFP] = useState('')


    useEffect(() => {
        if (route.params && route.params.colab_alt) {
            setNomeColab(route.params.colab_alt.nome)
            setEmail(route.params.colab_alt.email)
            setSenha(route.params.colab_alt.senha)
            setSetor(route.params.colab_alt.setor)
            setCpf(route.params.colab_alt.cpf)
            setCargo(route.params.colab_alt.cargo)
            setCep(route.params.colab_alt.cep)
            setEndereco(route.params.colab_alt.endereco)
            setNRCasa(route.params.colab_alt.nr_casa)
            setBairro(route.params.colab_alt.bairro)
            setCidade(route.params.colab_alt.cidade)
            setEstado(route.params.colab_alt.estado)
            setPFP(route.params.colab_alt.PFP)
        } else {
            setNomeColab('')
            setEmail('')
            setSenha('')
            setSetor('')
            setCpf('')
            setCargo('')
            setCep('')
            setEndereco('')
            setNRCasa('')
            setBairro('')
            setCidade('')
            setEstado('')
            setPFP('')
        }
    }, [route.params])

    const salvar = async () => {
        try {
            let endPoint = `${urlWS}/colaboradores/adicionar`
            let metodo = 'POST'

            if (route.params && route.params.colab_alt) {
                endPoint = `${urlWS}/colaboradores/alterar/${route.params.colab_alt.id_colaborador}`
                metodo = 'PUT'
            }

            const response = await fetch(endPoint,
                {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: nomeColab,
                        email: email,
                        senha: senha,
                        setor: setor,
                        cpf: cpf,
                        cargo: cargo,
                        cep: cep,
                        endereco: endereco,
                        nr_casa: nr_casa,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado,
                        PFP: PFP

                    })
                }
            )

            if (response.ok) {
                alert('Colaborador salvo com sucesso')
                navigation.goBack()
                console.log(response.nome);
            }

        } catch (error) {
            console.log('erro ao salvar:', error);
        }
    }

    return (
        <ScrollView>
            <View style={Estilos.view}>
                <Text style={Estilos.titulo}>Cadastro de Colaborador</Text>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Nome do Colaborador</Text>
                    <TextInput placeholder='Nome do Colaborador'
                        style={Estilos.inputs}
                        value={nomeColab}
                        onChangeText={setNomeColab}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Email</Text>
                    <TextInput placeholder='Email do Colaborador'
                        style={Estilos.inputs}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Senha</Text>
                    <TextInput placeholder='Senha do Colaborador'
                        style={Estilos.inputs}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Setor</Text>
                    <TextInput placeholder='Setor do Colaborador'
                        style={Estilos.inputs}
                        value={setor}
                        onChangeText={setSetor}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>CPF</Text>
                    <TextInput placeholder='Cpf do Colaborador'
                        style={Estilos.inputs}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Cargo</Text>
                    {/* <TextInput placeholder='Cargo do Colaborador'
                        style={Estilos.inputs}
                        value={cargo}
                        onChangeText={setCargo}
                    /> */}

                    <Picker
                        style={Estilos.picker}
                        selectedValue={cargo}
                        onValueChange={setCargo}
                    >
                        <Picker.Item label="Supervisor" value="Supervisor" />
                        <Picker.Item label="Colaborador" value="Colaborador" />
                    </Picker>
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Cep</Text>
                    <TextInput placeholder='Cep do Colaborador'
                        style={Estilos.inputs}
                        value={cep}
                        onChangeText={setCep}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Endereço</Text>
                    <TextInput placeholder='Endereço do Colaborador'
                        style={Estilos.inputs}
                        value={endereco}
                        onChangeText={setEndereco}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Número da casa</Text>
                    <TextInput placeholder='N° casa do Colaborador'
                        style={Estilos.inputs}
                        value={nr_casa}
                        onChangeText={setNRCasa}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Bairro</Text>
                    <TextInput placeholder='Bairro do Colaborador'
                        style={Estilos.inputs}
                        value={bairro}
                        onChangeText={setBairro}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Cidade</Text>
                    <TextInput placeholder='Cidade do Colaborador'
                        style={Estilos.inputs}
                        value={cidade}
                        onChangeText={setCidade}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Estado</Text>
                    <TextInput placeholder='Estado do Colaborador'
                        style={Estilos.inputs}
                        value={estado}
                        onChangeText={setEstado}
                    />
                </View>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Foto de perfil</Text>
                    <TextInput placeholder='Coloque o link da foto que deseja'
                        style={Estilos.inputs}
                        value={PFP}
                        onChangeText={setPFP}
                    />
                </View>

                <View>
                    {PFP == '' ? <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg' }} style={{ width: 100, height: 100, margin: 10 }} /> : <Image source={{ uri: PFP }} style={{ width: 100, height: 100 }} />}
                </View>

                <TouchableOpacity style={Estilos.botaoEscuro} onPress={salvar}>
                    <Text style={Estilos.botaoEscuroTexto}>Salvar</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}

export default CadColabISELF