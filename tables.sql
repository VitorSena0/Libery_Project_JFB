Create Table tb_books (
	titulo varchar(255) not null primary key,
	autor varchar(255) not null,
	editora varchar(255) not null,
	genero varchar(255) not null,
	estoque int not null
);

CREATE TABLE tb_alunos (
	id SERIAL PRIMARY KEY,
	nome varchar(255) not null,
	tel varchar(255) not null,
	email varchar(255) ,
	escolaridade varchar(255) not null,
	turma varchar(255) not null,
  emprestimos int
);

create table tb_emp (
	id serial primary key,
	aluno varchar(255) not null,
	livro varchar(255) not null primary key,
	data char(10) not null
);
-- Valores de  Teste
INSERT INTO tb_alunos (nome, tel, email, escolaridade, turma, emprestimos)
VALUES
  ('João', '123456789', 'joao@example.com', 'Subsequente', '1º período', 0),
  ('Maria', '987654321', 'maria@example.com', 'Médio', '1º ano', 0),
  ('Pedro', '111222333', 'pedro@example.com', 'Subsequente', '2º período', 0),
  ('Ana', '444555666', 'ana@example.com', 'Médio', '2º ano', 0),
  ('Carlos', '777888999', 'carlos@example.com', 'Subsequente', '3º período', 0),
  ('Laura', '555444333', 'laura@example.com', 'Médio', '3º ano', 0),
  -- Adicione mais valores aqui conforme necessário
  ('José', '123123123', 'jose@example.com', 'Subsequente', '1º período', 0),
  ('Fernanda', '456456456', 'fernanda@example.com', 'Médio', '1º ano', 0),
  ('Ricardo', '789789789', 'ricardo@example.com', 'Subsequente', '2º período', 0),
  ('Sandra', '987987987', 'sandra@example.com', 'Médio', '2º ano', 0),
  ('Gustavo', '654654654', 'gustavo@example.com', 'Subsequente', '3º período', 0),
  ('Patrícia', '321321321', 'patricia@example.com', 'Médio', '3º ano', 0),
  ('Roberto', '222333444', 'roberto@example.com', 'Subsequente', '1º período', 0),
  ('Camila', '555666777', 'camila@example.com', 'Médio', '1º ano', 0),
  ('Márcio', '888999000', 'marcio@example.com', 'Subsequente', '2º período', 0),
  ('Lúcia', '777666555', 'lucia@example.com', 'Médio', '2º ano', 0),
  ('Gabriel', '111222333', 'gabriel@example.com', 'Subsequente', '3º período', 0),
  ('Amanda', '444555666', 'amanda@example.com', 'Médio', '3º ano', 0),
  ('Rodrigo', '999888777', 'rodrigo@example.com', 'Subsequente', '1º período', 0),
  ('Mariana', '222111000', 'mariana@example.com', 'Médio', '1º ano', 0);

  INSERT INTO tb_books (titulo, autor, editora, genero, estoque)
VALUES
  ('A Origem das Espécies', 'Charles Darwin', 'Editora A', 'Ciências', 10),
  ('1984', 'George Orwell', 'Editora B', 'Ficção', 5),
  ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Editora C', 'Infantil', 8),
  ('Dom Quixote', 'Miguel de Cervantes', 'Editora D', 'Clássico', 6),
  ('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Editora E', 'Fantasia', 12),
  ('Cem Anos de Solidão', 'Gabriel García Márquez', 'Editora F', 'Ficção', 7),
  ('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Editora G', 'Fantasia', 9),
  -- Adicione mais valores aqui conforme necessário
  ('O Alquimista', 'Paulo Coelho', 'Editora H', 'Romance', 4),
  ('Crime e Castigo', 'Fiódor Dostoiévski', 'Editora I', 'Clássico', 3),
  ('O Hobbit', 'J.R.R. Tolkien', 'Editora E', 'Fantasia', 11),
  ('Ensaio sobre a Cegueira', 'José Saramago', 'Editora J', 'Ficção', 6),
  ('O Grande Gatsby', 'F. Scott Fitzgerald', 'Editora K', 'Romance', 8),
  ('A Revolução dos Bichos', 'George Orwell', 'Editora B', 'Ficção', 7),
  ('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Editora L', 'Clássico', 5),
  ('O Código Da Vinci', 'Dan Brown', 'Editora M', 'Suspense', 9),
  ('Orgulho e Preconceito', 'Jane Austen', 'Editora N', 'Romance', 6),
  ('A Montanha Mágica', 'Thomas Mann', 'Editora O', 'Clássico', 4),
  ('O Retrato de Dorian Gray', 'Oscar Wilde', 'Editora P', 'Ficção', 7),
  ('As Crônicas de Nárnia', 'C.S. Lewis', 'Editora Q', 'Fantasia', 10),
  ('Os Miseráveis', 'Victor Hugo', 'Editora R', 'Clássico', 6);
