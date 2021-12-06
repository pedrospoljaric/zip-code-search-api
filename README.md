# Zip Code Search API

## Descrição

A API foi desenvolvida usando `Node.js` devido à familiaridade com essa tecnologia.\
A organização do projeto segue como base uma estrutura de pastas com **domains**, **controllers** e **routes**, dessa forma:
- **domains**: contém os arquivos com os métodos de manipulação dos dados de acordo com as regras de negócio. Cada arquivo possui um único método para manter a organização e facilitar a criação de testes unitários, e os arquivos são organizados em pastas chamadas de "domínios", por exemplo, "usuários" e "endereços".
- **controllers**: contém arquivos responsáveis por fazer o mapeamento das requisições em parâmetros de entrada para os métodos presentes na pasta "domains", assim como redirecionar o retorno desses métodos como respostas das requisições.
- **routes**: contém todos os endpoints da aplicação organizados em arquivos e é responsável por receber as requisições e redirecioná-las para os respectivos "controllers". O framework `koa` foi utilizado para criação das rotas. Essa pasta também possui middlewares para tratamento de erros com e autorização com `JWT`, além da documentação dos endpoints feita utilizando `swagger`.

Seguindo esse modelo como base para a estrutura, o projeto também possui as seguintes principais pastas:
- **database**: Contém os arquivos relacionados à configuração da conexão com o banco de dados, assim como as migrations criadas. Isso é feito utilizando a biblioteca `knex` para realizar a conexão com um banco de dados em `PostgreSQL`, que está configurado como um container `Docker` em "docker-compose.yml", mas também pode ser conectado à uma instância local do SGBD.
- **models**: contém métodos responsáveis por executar queries no banco de dados. Funciona como uma interface entre os métodos da pasta "domains" e o banco. O isolamento desses métodos facilita a criação de mocks para testes.
- **services**: contém configurações e wrappers para serviços e bibliotecas utilizados que não estão diretamente ligados a nenhum domínio da aplicação, como `winston`, que foi utilizado para a criação de logs estruturados, e `redis`, que foi utilizado para o armazenamento de cache visando otimizar o tempo de resposta e reduzir a carga no banco de dados.
- **tests**: contém todos os arquivos de teste criados, divididos entre testes de integração e unitários por pastas. Todos os testes foram feitos utilizando a biblioteca `jest` e os testes de integração também utilizam a biblioteca `supertest`.
- **utils**: contém arquivos com métodos genéricos agnósticos às regras de negócio.

Também foram utilizadas as bibliotecas `ESLint` com os padrões AirBnb e diversas funções do `Lodash` em muitos pontos da aplicação.

Com relação a versionamento de código com git, foi utilizada a ferramenta `commitzen` para padronização dos commits e `git flow` para padronização das branches. O GitHub foi utilizado como plataforma de hospedagem, onde foi configurado um workflow para execução dos testes nos Pull Requests como parte de do processo de CI.

## Para testar a aplicação:

1. Com o Docker instalado, iniciar todos os containers usando o seguinte comando na pasta raíz:
```sh
docker-compose up -d
```

2. Acessar http://localhost:1234/api/v1/docs usando um navegador e enviar requisições para as rotas.

Observações:
- As credenciais do usuário de exemplo inserido são:
  - username: TesteLuizaLabs
  - password: P@ssw0rd
- O endereço de CEP 12210130 também foi inserido como exemplo.
  - Todos os endpoints relacionados a endereços necessitam de autorização.
