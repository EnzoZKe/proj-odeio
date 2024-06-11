import mysql.connector

def criar_Conexao():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='admin',
        database='epi_safeguard'

        # user="serversenai10", 
        # password="D3vAndradina",
        # host="servidorsenaieys.mysql.database.azure.com",
        # port=3306, 
        # database="epi_safeguard", 
        # ssl_ca="{ca-cert filename}", 
        # ssl_disabled=False
        
        )

def fechar_Conexao(conexao):
    if conexao:
        conexao.close()