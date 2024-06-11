from flask import Blueprint, jsonify, request
from conexao import criar_Conexao

epi_bp = Blueprint('epis', __name__)

@epi_bp.route('/obter', methods=['GET'])
def obterEPI():
    # epis = "Testando"

    conexao = criar_Conexao()

    cursor = conexao.cursor(dictionary=True)

    cursor.execute('select * from epis')

    epis = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(epis)

@epi_bp.route('/obter/<string:nome>', methods=['GET'])
def obterEPIID(nome):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta  = 'select * from epis where nome_epi like %s'
    cursor.execute(consulta, (f'%{nome}%',))

    epis = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(epis)

@epi_bp.route('/adicionar', methods=['POST'])
def adicionarEPI():
    novo_epi = request.get_json()

    if 'nome_epi' not in novo_epi or 'validade' not in novo_epi or 'descricao' not in novo_epi or 'categoria' not in novo_epi or 'foto_epi' not in novo_epi:
        return jsonify({'status': 'erro', 'message': 'Dados incompletos'}), 400
    
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    try:                                        #1        #2         #3        #4         #5            #1  #2  #3  #4  #5
        comando = 'insert into epis(nome_epi, validade, descricao, categoria, foto_epi) values(%s, %s, %s, %s, %s)'

        cursor.execute(comando, (novo_epi['nome_epi'], novo_epi['validade'], novo_epi['descricao'], novo_epi['categoria'], novo_epi['foto_epi']))

        conexao.commit()

        status = {'satatus': 'sucess', 'code': 201}

    except Exception as e:
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}

    finally:
        cursor.close()
        conexao.close()
    return jsonify(status)

@epi_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarEPI(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    dados = request.get_json()

    try:
        campos_updt = []
        valores_updt = []

        if 'nome_epi' in dados:
            campos_updt.append('nome_epi=%s')
            valores_updt.append(dados['nome_epi'])
        
        if 'validade' in dados:
            campos_updt.append('validade=%s')
            valores_updt.append(dados['validade'])
        
        if 'descricao' in dados:
            campos_updt.append('descricao=%s')
            valores_updt.append(dados['descricao'])

        if 'categoria' in dados:
            campos_updt.append('categoria=%s')
            valores_updt.append(dados['categoria'])

        if 'foto_epi' in dados:
            campos_updt.append('foto_epi=%s')
            valores_updt.append(dados['foto_epi'])


        if not campos_updt:
            return jsonify({'status': 'error', 'message': 'nenhum campo fornecido'}), 400
        
        comando = 'update epis set ' + ', '.join(campos_updt) + ' where id_epi = %s'
        valores = valores_updt + [id]

        cursor.execute(comando, valores)
        conexao.commit()

        status = {'status': 'sucess', 'message': 'Usuario atualizado com sucesso'}
        return jsonify(status), 201
    
    except Exception as e:
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}
        return jsonify(status)
    
    finally:
        cursor.close()
        conexao.close()

@epi_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarColab(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    cliente_existente = cursor.execute("select count(*) from epis where id_epi = %s", (id,))

    cursor.fetchone()

    if cliente_existente == 0:
        return jsonify({'status': 'erro', 'message': 'EPI não encontrado'}), 404
    
    try:
        comando = 'delete from epis where id_epi = %s'
        cursor.execute(comando, (id,))
        conexao.commit()

        status = {'satatus': 'sucess', 'message': 'EPI deletado com suceso'}, 201

    except Exception as e: 
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()

    return jsonify(status)
