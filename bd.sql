create database epi_safeguard;
use epi_safeguard;

create table epis(
	id_epi int primary key auto_increment,
    nome_epi varchar(500) not null,
    validade int not null,
    descricao varchar(1000),
    categoria varchar(255) not null,
    foto_epi varchar(10000) not null
);

drop table epis;

create table colaboradores(
	id_colaborador int primary key auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null,
    senha varchar(255) not null,
    setor varchar(255) not null,
    cpf varchar(255),
    cargo varchar(255) not null,
    cep varchar(255),
    endereco varchar(500),
    nr_casa varchar(20),
    bairro varchar(300),
    cidade varchar(200),
    estado varchar(50),
    PFP varchar(10000)
);

select * from usuarios;

-- drop table colaboradores;

create table colaboradores_epi(
	id_vinculacao int primary key auto_increment,
    id_colaborador int,
    id_colaborador_supervisor int,
    id_epi int,
    data_cad date,
    data_vencimento date,
    notificado int
);

drop table colaboradores_epi;

create table notificacoes(
	id_notificacao int primary key auto_increment,
    descricao varchar(500),
    id_colaborador int,
    id_epi int
);

drop table colaboradores;
drop table epis;

insert into epis(nome_epi, validade, descricao, categoria, foto_epi)
values("Capacete", 200, "Capacete amarelo", "Capacetes", "https://http2.mlstatic.com/D_NQ_NP_672628-MLB51482863487_092022-O.webp");

insert into colaboradores(nome, email, senha, setor, cpf, cargo, cep, endereco, nr_casa, bairro, cidade, estado, PFP)
values("Colab", "teste@teste", "123", "Tal", "1", "Supervisor", "16900300", "sla", "10", "bairro randon", "cidade random", "RJ", "https://img.freepik.com/fotos-gratis/designer-trabalhando-no-modelo-3d_23-2149371896.jpg");


select * from colaboradores;
select * from epis;

select
ce.id_vinculacao,
c.id_colaborador,
ce.id_colaborador_supervisor,
e.id_epi,
date_format(ce.data_cad, '%d/%m/%y') as "Data vinculação"
from colaboradores_epi ce
join colaboradores c on ce.id_colaborador = c.id_colaborador
join colaboradores s on ce.id_colaborador_supervisor = s.id_colaborador
join epis e on ce.id_epi = e.id_epi;

insert into colaboradores_epi(id_colaborador, id_colaborador_supervisor, id_epi, data_cad)
values('1','1','2',current_date());

select * from colaboradores_epi;
use epi_safeguard;







