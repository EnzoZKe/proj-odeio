from flask import Flask
from flask_cors import CORS
from routes.api_colaborador import colaborador_bp
from routes.api_epi import epi_bp
from routes.api_notificacao import notificacao_bp
from routes.api_vinculacao import vinculacao_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(colaborador_bp, url_prefix='/colaboradores')

app.register_blueprint(epi_bp, url_prefix='/epis')

app.register_blueprint(notificacao_bp, url_prefix='/notificacoes')

app.register_blueprint(vinculacao_bp, url_prefix='/vinculacoes')

if __name__ == '__main__':
    app.run(port=5000, host='192.168.0.110', debug=True)
    # app.run(debug=True)