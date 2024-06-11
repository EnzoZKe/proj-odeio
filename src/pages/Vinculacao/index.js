import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Estilos, corPrincipal, corClara } from '../../styles/Estilo';
import { urlWS } from '../../config';

const Vinculacao = () => {
    const [colaborador, setColaborador] = useState({});
    const [supervisor, setSupervisor] = useState({});
    const [epi, setEpi] = useState([]);
    const [epiSelecionado, setEpiSelecionado] = useState('');
    const [epiVinculado, setEpiVinculado] = useState([]);

    const carregarDados = async () => {
        try {
            let colaboradorSelecionado = await AsyncStorage.getItem('colaboradorSelecionado');
            colaboradorSelecionado = JSON.parse(colaboradorSelecionado);
            setColaborador(colaboradorSelecionado);

            let supervisorSelecionado = await AsyncStorage.getItem('dadosUserLogado');
            supervisorSelecionado = JSON.parse(supervisorSelecionado);
            setSupervisor(supervisorSelecionado);

            let epis = await fetch(`${urlWS}/epis/obter`);
            let dadosEpi = await epis.json();
            setEpi(dadosEpi);
            //console.log("Dados EPI:", dadosEpi);

            let vinc = await fetch(`${urlWS}/vinculacoes/obter/${colaboradorSelecionado.id_colaborador}`);
            let finalizar = await vinc.json();
            setEpiVinculado(finalizar);
            console.log("EPIs Vinculados:", finalizar);
            console.log("Id do EPI:", epi.id_epi);
            console.log("id da vinculação:", epiVinculado.id_epi);

        } catch (error) {
            console.log("Erro ao buscar dados: ", error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const botaoExcluirVinc = async (id) => {
        try {
            const resposta = await fetch(`${urlWS}/vinculacoes/deletar/${id}`,
                { method: 'DELETE' }
            )
            if (resposta.ok)
                carregarDados()

        } catch (error) {
            console.error('Erro ao excluir Produto:', error)
        }
    }

    const botaoVincular = async () => {
        try {
            console.log("Colaborador:", colaborador.id_colaborador);
            console.log("Supervisor:", supervisor.id_colaborador);
            console.log("Id do EPI:", epiSelecionado);
            console.log(JSON.stringify({
                id_colaborador: colaborador.id_colaborador,
                id_colaborador_supervisor: supervisor.id_colaborador,
                id_epi: epiSelecionado
            }));
            const response = await fetch(urlWS + '/vinculacoes/adicionar',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_colaborador: colaborador.id_colaborador,
                        id_colaborador_supervisor: supervisor.id_colaborador,
                        id_epi: epiSelecionado,
                        notificado: 0
                    })
                })

            if (response.ok) {
                alert('Compra salva')
                carregarDados()
            }
        } catch (error) {
            console.log('erro ao compra', error);
        }
    }

    const exibirVinculados = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id_epi}
                style={{
                    flexDirection: 'row',
                    backgroundColor: corClara,
                    padding: 5,
                    borderRadius: 14,
                    marginVertical: 6,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.foto_epi }} style={Estilos.imgBloco} />
                </View>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'scroll'
                }}>
                    <View
                        style={{ marginVertical: 10, marginHorizontal: 28, justifyContent: 'center' }}>
                        <Text style={Estilos.textoEscuro}>{item.nome_epi}</Text>
                        <Text style={Estilos.textoEscuro}>{item.descricao}</Text>
                        <Text style={Estilos.textoEscuro}>{item.data_vinculo}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => botaoExcluirVinc(item.id_epi)}>
                    <MaterialIcons name="delete" size={40} color={corPrincipal} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (

            <View style={Estilos.view}>
                <Text style={{
                    color: corPrincipal,
                    fontSize: 33,
                    fontWeight: "700",
                    textAlign: 'center'
                }}>{colaborador.nome}</Text>
                <Text style={Estilos.subTitulo}>Colaborador</Text>

                <View>
                    <Text style={Estilos.textoEmCimaInput}>Selecione o EPI</Text>
                    <Picker
                        style={Estilos.picker}
                        selectedValue={epiSelecionado}
                        onValueChange={setEpiSelecionado}
                    >
                        {epi.map((epis) => (
                            <Picker.Item key={epis.id_epi} label={epis.nome_epi} value={epis.id_epi} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={Estilos.botaoEscuro}
                    onPress={botaoVincular}
                >
                    <Text style={Estilos.botaoEscuroTexto}>Vincular</Text>
                </TouchableOpacity>

                <Text style={Estilos.subTitulo}>EPIs vinculados a este colaborador:</Text>

                <ScrollView>
                    <FlatList
                        data={epiVinculado}
                        renderItem={exibirVinculados}
                        keyExtractor={(item) => item.id_vinculacao.toString()}
                    />
                </ScrollView>
            </View>

    );
}

export default Vinculacao;
