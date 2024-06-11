from flask import Blueprint, jsonify, request
from conexao import criar_Conexao

vinculacao_bp = Blueprint('vinculacoes', __name__) 

@vinculacao_bp.route('/obter/<int:id>', methods=['GET'])
def obterVinculacao(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("select e.foto_epi, e.nome_epi, e.descricao, ce.data_cad, ce.data_vencimento, ce.id_vinculacao from colaboradores_epi ce join epis e on ce.id_epi = e.id_epi where ce.id_colaborador = %s", (id,))
    dados = cursor.fetchall()

    cursor.close()
    conexao.close()
    return jsonify(dados)

@vinculacao_bp.route('/obter', methods=['GET'])
def obterTudo():
    conexao = criar_Conexao()

    cursor = conexao.cursor(dictionary=True)

    cursor.execute('select * from colaboradores_epi')

    vinculacao = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(vinculacao)

@vinculacao_bp.route('/adicionar', methods=['POST'])
def adicionarEPI():
    novo_vinc = request.get_json()

    if 'id_colaborador' not in novo_vinc or 'id_colaborador_supervisor' not in novo_vinc or 'id_epi' not in novo_vinc or 'notificado' not in novo_vinc:
        return jsonify({'status': 'erro', 'message': 'Dados incompletos'}), 400
    
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    try:
        comando = 'insert into colaboradores_epi(id_colaborador, id_colaborador_supervisor, id_epi, notificado, data_cad) values(%s, %s, %s, %s,current_date)'

        cursor.execute(comando, (novo_vinc['id_colaborador'], novo_vinc['id_colaborador_supervisor'], novo_vinc['id_epi'], novo_vinc['notificado']))

        conexao.commit()

        status = {'satatus': 'sucess', 'code': 201}

    except Exception as e:
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}

    finally:
        cursor.close()
        conexao.close()
    return jsonify(status)

@vinculacao_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarColab(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    vinculacao_existente = cursor.execute("select count(*) from colaboradores_epi where id_vinculacao = %s", (id,))

    cursor.fetchone()

    if vinculacao_existente == 0:
        return jsonify({'status': 'erro', 'message': 'EPI não encontrado'}), 404
    
    try:
        comando = 'delete from colaboradores_epi where id_vinculacao = %s'
        cursor.execute(comando, (id,))
        conexao.commit()

        status = {'satatus': 'sucess', 'message': 'vinculação deletado com suceso'}, 201

    except Exception as e: 
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()

    return jsonify(status)