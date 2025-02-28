# Library Project (libery_project_jfb)

## Descrição
Este é um projeto de uma biblioteca virtual desenvolvido utilizando Node.js, Express e PostgreSQL. Ele fornece uma API para gerenciar alunos e livros da biblioteca, permitindo a leitura, adição, remoção e atualização de registros.

![image](https://github.com/user-attachments/assets/5e34e9cb-93a1-46e8-b4bb-fafebf651adb)
![image](https://github.com/user-attachments/assets/44144b4f-5c7c-4411-af12-c951acc0d933)
![image](https://github.com/user-attachments/assets/b6a4ecb6-8247-4382-9533-e84edaf318b8)
![image](https://github.com/user-attachments/assets/0e7b7422-a0db-45e2-89f2-ed6a26b912e4)
![image](https://github.com/user-attachments/assets/85215e6c-df50-48f6-b047-746e87b74f5c)


## Instalação
1. Certifique-se de ter o Node.js e o PostgreSQL instalado em sua máquina.
2. Faça o clone deste repositório em seu ambiente local.
3. Navegue até o diretório raiz do projeto.
4. Execute o comando `npm install` para instalar as dependências do projeto.

## Configuração do Banco de Dados
1. Certifique-se de ter uma instância do PostgreSQL em execução.
2. Crie um arquivo chamado `.env` no diretório raiz do projeto.
3. No arquivo `.env`, defina as seguintes variáveis de ambiente, preenchendo com as informações de conexão do seu banco de dados:
   ```
   DB_USER=<usuário>
   DB_HOST=<host>
   DB_DATABASE=<banco de dados>
   DB_PASSWD=<senha>
   DB_PORT=5432
   ```

## Uso
1. Execute o comando `npm start` para iniciar o servidor.
2. Acesse a API utilizando as rotas disponíveis para gerenciar alunos e livros da biblioteca.

## Rotas disponíveis
### Alunos
- GET /aluno/ReadAluno: Retorna todos os alunos cadastrados na biblioteca.
- POST /aluno/SignAluno: Cadastra um novo aluno na biblioteca.
- POST /aluno/DeleteAluno: Remove um aluno da biblioteca.
- POST /aluno/UpdateAluno: Atualiza os dados de um aluno na biblioteca.

### Livros
- GET /book/ReadBook: Retorna todos os livros cadastrados na biblioteca.
- POST /book/SignBook: Cadastra um novo livro na biblioteca.
- POST /book/DeleteBook: Remove um livro da biblioteca.
- POST /book/UpdateBook: Atualiza os dados de um livro na biblioteca.

## Dependências
- axios: ^1.4.0
- body-parser: ^1.20.2
- ejs: ^3.1.9
- express: ^4.18.2
- pg: ^8.11.0

## Dependências de desenvolvimento
- dotenv: ^16.0.3

## Licença
ISC

---

Este é um projeto fictício criado para fins de demonstração e aprendizado.
