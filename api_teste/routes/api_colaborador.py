from flask import Blueprint, jsonify, request
from conexao import criar_Conexao

colaborador_bp = Blueprint('colaboradores', __name__)

@colaborador_bp.route('/obter', methods=['GET'])
def obterColab():
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute('select * from colaboradores')

    colaborador = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(colaborador)

@colaborador_bp.route('/obter/<string:nome>', methods=['GET'])
def obterColabID(nome):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    consulta  = 'select * from colaboradores where nome like %s'
    cursor.execute(consulta, (f'%{nome}%',))

    clientes = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(clientes)

@colaborador_bp.route('/adicionar', methods=['POST'])
def adicionarColab():
    novo_colab = request.get_json()

    if 'nome' not in novo_colab or 'email' not in novo_colab or 'senha' not in novo_colab or 'setor' not in novo_colab or 'cpf' not in novo_colab or 'cargo' not in novo_colab or 'cep' not in novo_colab or 'endereco' not in novo_colab or 'nr_casa' not in novo_colab or 'bairro' not in novo_colab or 'cidade' not in novo_colab or 'estado' not in novo_colab:
        return jsonify({'status': 'erro', 'message': 'Dados incompletos'}), 400
    
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    try:                                      #1     #2     #3     #4    #5    #6    #7     #8        #9     #10     #11     #12           #1  #2  #3  #4  #5  #6  #7  #8  #9 #10  #11 #12
        comando = 'insert into colaboradores(nome, email, senha, setor, cpf, cargo, cep, endereco, nr_casa, bairro, cidade, estado) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

        cursor.execute(comando, (novo_colab['nome'], novo_colab['email'], novo_colab['senha'], novo_colab['setor'], novo_colab['cpf'], novo_colab['cargo'], novo_colab['cep'], novo_colab['endereco'], novo_colab['nr_casa'], novo_colab['bairro'], novo_colab['cidade'], novo_colab['estado']))

        conexao.commit()

        status = {'satatus': 'sucess', 'code': 201}

    except Exception as e:
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}

    finally:
        cursor.close()
        conexao.close()
    return jsonify(status)

@colaborador_bp.route('/alterar/<int:id>', methods=['PUT'])
def alterarColab(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    dados = request.get_json()

    try:
        campos_updt = []
        valores_updt = []

        if 'nome' in dados:
            campos_updt.append('nome=%s')
            valores_updt.append(dados['nome'])
        
        if 'email' in dados:
            campos_updt.append('email=%s')
            valores_updt.append(dados['email'])
        
        if 'senha' in dados:
            campos_updt.append('senha=%s')
            valores_updt.append(dados['senha'])
        
        if 'setor' in dados:
            campos_updt.append('setor=%s')
            valores_updt.append(dados['setor'])

        if 'cpf' in dados:
            campos_updt.append('cpf=%s')
            valores_updt.append(dados['cpf'])

        if 'cargo' in dados:
            campos_updt.append('cargo=%s')
            valores_updt.append(dados['cargo'])

        if 'cep' in dados:
            campos_updt.append('cep=%s')
            valores_updt.append(dados['cep'])

        if 'endereco' in dados:
            campos_updt.append('endereco=%s')
            valores_updt.append(dados['endereco'])

        if 'nr_casa' in dados:
            campos_updt.append('nr_casa=%s')
            valores_updt.append(dados['nr_casa'])

        if 'bairro' in dados:
            campos_updt.append('bairro=%s')
            valores_updt.append(dados['bairro'])

        if 'cidade' in dados:
            campos_updt.append('cidade=%s')
            valores_updt.append(dados['cidade'])

        if 'estado' in dados:
            campos_updt.append('estado=%s')
            valores_updt.append(dados['estado'])

        if 'PFP' in dados:
            campos_updt.append('PFP=%s')
            valores_updt.append(dados['PFP'])


        if not campos_updt:
            return jsonify({'status': 'error', 'message': 'nenhum campo fornecido'}), 400
        
        comando = 'update colaboradores set ' + ', '.join(campos_updt) + ' where id_colaborador = %s'
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

@colaborador_bp.route('/deletar/<int:id>', methods=['DELETE'])
def deletarColab(id):
    conexao = criar_Conexao()
    cursor = conexao.cursor()

    cliente_existente = cursor.execute("select count(*) from colaboradores where id_colaborador = %s", (id,))

    cursor.fetchone()

    if cliente_existente == 0:
        return jsonify({'status': 'erro', 'message': 'Usuario não encontrado'}), 404
    
    try:
        comando = 'delete from colaboradores where id_colaborador = %s'
        cursor.execute(comando, (id,))
        conexao.commit()

        status = {'satatus': 'sucess', 'message': 'Usuario deletado com suceso'}, 201

    except Exception as e: 
        conexao.rollback()
        status = {'satatus': 'error', 'message': str(e)}
    finally:
        cursor.close()
        conexao.close()

    return jsonify(status)

@colaborador_bp.route('/login', methods=['POST'])
def logColab():
    dados = request.get_json()
    Usuario = dados['cpf']
    Senha = dados['senha']
    Cargo = dados['cargo']

    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute('select * from colaboradores where cpf = %s and senha = %s and cargo = %s', (Usuario, Senha, Cargo))
    usuario = cursor.fetchall()

    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({'status': 'error', 'message': 'Usuario ou senha invalido'})
