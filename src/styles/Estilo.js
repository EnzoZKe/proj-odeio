import { StyleSheet } from "react-native"

const corPrincipal = '#496AC5'
const corClara = '#DDE8F4'
const corBranca = '#F8F8FF'
const corClaraMaisEscura = '#91B4DB'
const corPreta = '#14101A'
const corVermelha = '#F54343'

const Estilos = StyleSheet.create({
    conteudoCorpo: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: '5%',
        paddingTop: '2%',
    },
    botao: {
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    botaoIcone: {
        borderWidth: 2,
        borderRadius: 25,
        marginHorizontal: 2,
        padding: 2,
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 1,
    },
    inputs: {
        padding: 3,
        borderWidth: 2,
        marginBottom: 10,
        flex: 1
    },
    inputsCads: {
        padding: 5,
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: corClara,
        borderColor: corClaraMaisEscura,
        color: corClaraMaisEscura
    },
    titulo: {
        color: corPrincipal,
        fontSize: 33,
        fontWeight: "700",
        margin: 20,
        textAlign: 'center'
    },
    subTitulo: {
        color: corPreta,
        fontSize: 19,
        fontWeight: "700",
        textAlign: 'center',
        margin: 12
    },
    texto: {
        color: corPreta,
        fontSize: 15,
        fontWeight: "700",
        textAlign: 'left',
        margin: 12
    },
    botaoEscuro: {
        backgroundColor: corPrincipal,
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    botaoEscuroTexto: {
        color: corClara,
        fontWeight: "700"
    },
    textoEscuro: {
        color: corPreta,
        fontWeight: "700",
        maxWidth: 120
    },
    botaoVermelho: {
        backgroundColor: corVermelha,
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    botaoClaro: {
        backgroundColor: corClara,
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    botaoClaroTexto: {
        color: corPrincipal,
        fontWeight: "700",
    },
    inputs: {
        backgroundColor: corClara,
        color: corClaraMaisEscura,
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingLeft: 15,
        fontWeight: "700"
    },
    picker: {
        backgroundColor: corClara,
        borderColor: corClaraMaisEscura,
        color: corClaraMaisEscura,
        width: 300,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        paddingLeft: 15,
        fontWeight: "700"
    },
    textoEmCimaInput: {
        color: corPreta,
        fontWeight: "700",
        marginTop: 10
    },
    imagemEPI: {
        height: 210,
        width: 270
    },
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Arial'
    },
    caixa: {
        borderRadius: 8,
        borderWidth: 4,
        borderColor: corClara,
        width: 300,
        height: 250,
        justifyContent: 'center'
    },
    caixaNotificacao: {
        margin: 7,
        padding: 20,
        backgroundColor: corClara,
        borderRadius: 15,
        flexDirection: 'row'
    },
    imagemNotificacao: {
        height: 40,
        width: 70
    },
    textoNotificacao: {
        color: corPreta,
        fontSize: 13,
        fontWeight: "500"

    },
    oveflows: {
        overflow: 'scroll'
    },
    blocoInfo: {
        flexDirection: 'row',
        backgroundColor: corClara,
        padding: 5,
        borderRadius: 14,
        margin: 6,
        alignItems: 'center'
    },
    imgBloco: {
        width: 100,
        height: 100,
        borderRadius: 10
    }
})
export {
    corPrincipal,
    corClara,
    corPreta,
    corBranca,
    corVermelha,
    Estilos
}