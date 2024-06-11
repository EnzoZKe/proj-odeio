import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View, Text, TextInput, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Estilos } from '../../styles/Estilo';
import { urlWS } from '../../config';

const CadEPISELF = ({ navigation, route }) => {
    const [nomeEPI, setNomeEPI] = useState('')
    const [descEPI, setDescEPI] = useState('')
    const [catEPI, setCatEPI] = useState('')
    const [valiEPI, setValiEPI] = useState('')
    const [fotoEPI, setFotoEPI] = useState('')

    useEffect(
        () => {
            console.log(route.params);
            if (route.params && route.params.epiAlterar) {
                setNomeEPI(route.params.epiAlterar.nome_epi)
                setDescEPI(route.params.epiAlterar.descricao)
                setCatEPI(route.params.epiAlterar.categoria)
                setValiEPI(route.params.epiAlterar.validade)
                setFotoEPI(route.params.epiAlterar.foto_epi)
            } else {
                setNomeEPI('')
                setDescEPI('')
                setCatEPI('')
                setValiEPI('')
                setFotoEPI('')
            }
        }, [route.params]
    )


    const salvar = async () => {
        try {
            let endpoint = `${urlWS}/epis/adicionar`
            let metodo = 'POST'

            if (route.params && route.params.epiAlterar) {

                endpoint = `${urlWS}/epis/alterar/${route.params.epiAlterar.id_epi}`
                metodo = 'PUT'

            }

            console.log(JSON.stringify({
                categoria: catEPI,
                descricao: descEPI,
                foto_epi: fotoEPI,
                nome_epi: nomeEPI,
                validade: valiEPI
            }));


            const response = await fetch(endpoint,
                {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        categoria: catEPI,
                        descricao: descEPI,
                        foto_epi: fotoEPI,
                        nome_epi: nomeEPI,
                        validade: valiEPI
                    })
                })

                if (response.ok) {
                    alert('SALVO COM SUCESSO')
                    navigation.goBack()
                }
        } catch (error) {
            console.error('Erro ao salvar produto:', error)
        }
    }

    return (
        <View style={[Estilos.view, Estilos.oveflows]}>
            <Text style={Estilos.titulo}>Cadastro de EPI</Text>

            <View>
                <Text style={Estilos.textoEmCimaInput}>Nome do EPI</Text>
                <TextInput placeholder='Insira o Nome do EPI'
                    onChangeText={setNomeEPI}
                    value={nomeEPI}
                    style={Estilos.inputs}
                />
            </View>

            <View>
                <Text style={Estilos.textoEmCimaInput} >Descrição do EPI</Text>
                <TextInput placeholder='Insira a descrição do EPI'
                    onChangeText={setDescEPI}
                    value={descEPI}
                    style={Estilos.inputs}
                />
            </View>

            <View>
                <Text style={Estilos.textoEmCimaInput} >Categoria do EPI</Text>
                <TextInput placeholder='Insira a categoria do EPI'
                    onChangeText={setCatEPI}
                    value={catEPI}
                    style={Estilos.inputs}
                />
            </View>

            <View>  
                <Text style={Estilos.textoEmCimaInput} >Validade do EPI</Text>
                <TextInput placeholder='Insira a validade em dias'
                    onChangeText={setValiEPI}
                    value={valiEPI}
                    style={Estilos.inputs}
                />
            </View>

            <View>
                <Text style={Estilos.textoEmCimaInput} >Foto do EPI</Text>
                <TextInput placeholder='Insira a foto do EPI'
                    onChangeText={setFotoEPI}
                    value={fotoEPI}
                    style={Estilos.inputs}
                />
            </View>

            <View>
                {fotoEPI == '' ? <Image source={{uri: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}} style={{ width: 100, height: 100, margin: 10 }}/> : <Image source={{ uri: fotoEPI }} style={{ width: 100, height: 100 }} />}
            </View>

            <TouchableOpacity 
                onPress={salvar} 
                style={Estilos.botaoEscuro}
            >
                <Text style={Estilos.botaoEscuroTexto}>Cadastrar EPI</Text>
            </TouchableOpacity>

        </View>
    )
}

export default CadEPISELF