from flask import Blueprint, jsonify, request
from conexao import criar_Conexao

notificacao_bp = Blueprint('notificacoes', __name__)

@notificacao_bp.route('/obter/<int:id>', methods=['GET'])
def obterNotficacoes(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("select * from notificacoes where id_colaborador = %s", (id,))
    dados = cursor.fetchall()

    cursor.close()
    conexao.close()
    return jsonify(dados)

@notificacao_bp.route('/gerar', methods=['POST'])
def gerarNotificacao():
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
                    select
                        ce.id_vinculacao, e.nome_epi, ce.id_colaborador, ce.id_epi, date_format(CE.data_vencimento, '%d/%m/%Y') as data_vencimento
                    from
                        colaborador_epi ce join epis e on ce.id_epi = e.id_epi
                    where
                        ce.data_vencimento <= (current_date() + INTERVAL 100 DAY) and ce.notificado = 0

                    """)
    dados = cursor.fetchall()
    for item in dados:
        comando = "insert into notificacoes(id_colaborador, id_epi, descricao) values(%s,%s,%s)"
        descricao = f'Seu EPI {item["nome_epi"]} vence no dia {item["data_vencimento"]} solicite um novo EPI com seu supervisor'
        cursor.execute(comando, (item['id_colaborador'], item['id_epi'], descricao, ))

        comando = 'update colaboradores_epi set notificado = 1 where id_vinculacao = %s'
        cursor.execute(comando, (item['id_vinculacao'], ))
    
    conexao.commit()

    cursor.close()
    conexao.close()
    return jsonify(dados)


