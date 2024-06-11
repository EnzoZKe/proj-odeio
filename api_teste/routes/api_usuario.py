from flask import Blueprint, jsonify, request
from conexao import criar_Conexao

usuario_bp = Blueprint('usuarios', __name__)

@usuario_bp.route('/obter', methods=['GET'])
def obterColab():
    conexao = criar_Conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute('select * from usuarios')

    usuario = cursor.fetchall()

    cursor.close()
    conexao.close()

    return jsonify(usuario)