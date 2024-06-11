import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Button, FlatList } from "react-native";
import { Estilos, corVermelha, corClara } from '../../styles/Estilo';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { urlWS } from '../../config';

import { MaterialIcons, FontAwesome6, FontAwesome } from '@expo/vector-icons';

const CadEPI = ({ navigation, route }) => {

    const [dadosEPI, setDadosEPI] = useState([])
    const [itemPesquisa, setItemPesquisa] = useState('')
    const isFoucsed = useIsFocused()

    useEffect(() => {
        buscarDadosEPI();
    }, [isFoucsed]);

    const buscarDadosEPI = async () => {
        try {
            let URL = `${urlWS}/epis/obter`

            if (itemPesquisa != '') {
                URL = `${urlWS}/obter/${itemPesquisa}`
            }

            const response = await fetch(URL);
            const dados = await response.json();

            setDadosEPI(dados)

        } catch (error) {
            console.log('erro ao buscar dados', error);
        }
    }

    const apagar = async (id_epi) => {
        try {
            const responsta = await fetch(`${urlWS}/epis/deletar/${id_epi}`, { method: 'DELETE' })
            if (responsta.ok) {
                buscarDadosEPI()
            }
        } catch (error) {
            console.warn("erro ao excluir", error);
        }
    }

    const exibir = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => {
                console.log(item);
                navigation.navigate('Cadastrar-EPI', { epiAlterar: item })
            }}
                style={{
                    flexDirection: 'row',
                    backgroundColor: corClara,
                    padding: 5,
                    borderRadius: 14,
                    marginVertical: 6,
                    marginHorizontal: 30,
                    alignItems: 'center',
                    justifyContent: 'space-between',

                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.foto_epi }} style={Estilos.imgBloco} />
                </View>
                <View
                    style={{ marginVertical: 10, marginHorizontal: 28, justifyContent: 'center' }}>
                    <Text
                        style={Estilos.textoEscuro}
                        numberOfLines={3}
                    >{item.nome_epi}</Text>
                    <Text style={Estilos.textoEscuro}>{item.categoria}</Text>
                    <Text style={Estilos.textoEscuro}>{item.descricao}</Text>

                </View>
                <TouchableOpacity
                    onPress={() => apagar(item.id_epi)}
                >
                    <FontAwesome name="trash" size={25} color={corVermelha} />
                </TouchableOpacity>

            </TouchableOpacity >
        )
    }
    return (
        <View style={Estilos.view}>
            <Text style={Estilos.titulo}>Cadastrar EPI</Text>

            <TextInput
                placeholder='Pesquisar EPI'
                value={itemPesquisa}
                onChangeText={setItemPesquisa}
                style={Estilos.inputs}
            />

            <TouchableOpacity
                style={Estilos.botaoEscuro}
                onPress={buscarDadosEPI} >

                <Text style={Estilos.botaoEscuroTexto}>Pesquisar EPI</Text>
            </TouchableOpacity>



            <TouchableOpacity
                style={[Estilos.botaoEscuro, Estilos.botaoEscuroTexto]}
                onPress={() => navigation.navigate('Cadastrar-EPI')} >
                <Text style={Estilos.botaoEscuroTexto}>Cadastrar-EPI</Text>
            </TouchableOpacity>

            <FlatList
                data={dadosEPI}
                renderItem={exibir}
                keyExtractor={(item) => item.id_epi.toString()}
            />

        </View>

    )
}

export default CadEPI