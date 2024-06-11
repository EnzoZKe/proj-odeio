import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, Button, FlatList, TextInput } from "react-native"
import { Estilos, corClara, corVermelha, corPrincipal } from '../../styles/Estilo'
import { useIsFocused } from '@react-navigation/native';
import { urlWS } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const CadColab = ({ navigation }) => {
    const [txtPesquisa, setTxtPesquisa] = useState('')
    const [dados, setDados] = useState([])
    const isFoucsed = useIsFocused()

    const buscarDados = async () => {

        let URL = `${urlWS}/colaboradores/obter`

        if (txtPesquisa != '') {
            URL = `${urlWS}/colaboradores/obter/${txtPesquisa}`
        }

        try {
            const response = await fetch(URL)
            const dados = await response.json()
            setDados(dados)
        } catch (error) {
            console.log('erro ao buscar dados:', error);
        }
    }

    const apagar = async (id_colaborador) => {
        try {
            const responsta = await fetch(`${urlWS}/colaboradores/deletar/${id_colaborador}`, { method: 'DELETE' })
            if (responsta.ok) {
                buscarDados()
            }
        } catch (error) {
            console.warn("erro ao excluir", error);
        }
    }

    const exibir = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    backgroundColor: corClara,
                    padding: 5,
                    borderRadius: 14,
                    margin: 6,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 30
                }}

                onPress={async () => {
                    await AsyncStorage.setItem('colaboradorSelecionado', JSON.stringify({
                        id_colaborador: item.id_colaborador,
                        nome: item.nome
                    }));
                    navigation.navigate('Vincular-EPI')
                }
                }
            >

                    <View>
                        <Image
                            source={{ uri: item.PFP }}
                            style={Estilos.imgBloco}
                        />
                    </View>
                    <View>
                        <Text style={Estilos.textoEscuro}>{item.nome}</Text>
                        <Text style={Estilos.textoEscuro}>{item.cargo}</Text>
                        <Text style={Estilos.textoEscuro}>{item.cpf}</Text>
                    </View>
                    <View style={{ 
                        flexDirection: 'column',
                        gap: 20
                     }}>
                        <TouchableOpacity
                            onPress={() => apagar(item.id_colaborador)}
                        >
                            <FontAwesome name="trash" size={25} color={corVermelha} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cadastrar-Colaborador', { colab_alt: item })}
                        >
                            <MaterialCommunityIcons name="pencil" size={25} color={corPrincipal} />
                        </TouchableOpacity>
                    </View>
                

            </TouchableOpacity>
        )

    }

    useEffect(() => {
        buscarDados()
    }, [isFoucsed])

    return (
        <View style={Estilos.view}>
            <Text style={Estilos.titulo} >Colaboradores</Text>
            <TextInput
                placeholder='pesquisar colaboradores'
                value={txtPesquisa}
                onChangeText={setTxtPesquisa}
                style={Estilos.inputs}
            />
            <TouchableOpacity
                style={[Estilos.botaoEscuroTexto, Estilos.botaoEscuro]}
                onPress={buscarDados} >

                <Text style={Estilos.botaoEscuroTexto}>Pesquisar colaboradores</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Estilos.botaoEscuro}
                onPress={(() => navigation.navigate('Cadastrar-Colaborador'))}
            >
                <Text style={Estilos.botaoEscuroTexto}>Cadastrar Colaborador</Text>
            </TouchableOpacity>

            <FlatList
                data={dados}
                renderItem={exibir}
                keyExtractor={(item) => item.id_colaborador.toString()}
            />
        </View>
    )
}

export default CadColab