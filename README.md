# 🚖 Taxi Application - Integração com Google Maps  

Este projeto é uma aplicação de gerenciamento de viagens para uma plataforma de táxi, oferecendo funcionalidades como gerenciamento de motoristas, consulta de histórico de viagens e traçado de rotas em tempo real usando a API do Google Maps. Ele é dividido em duas partes principais:  

- **Frontend:** Desenvolvido em React para a interface do usuário.  
- **Backend:** Desenvolvido em Node.js para gerenciar as regras de negócio e a comunicação com o banco de dados MySQL.  

---

## 📋 Índice  

1. [Descrição do Projeto](#-descrição-do-projeto)  
2. [Principais Funcionalidades](#-principais-funcionalidades)  
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
4. [Pré-requisitos](#-pré-requisitos)  
5. [Instalação](#-instalação)  
6. [Estrutura de Diretórios](#-estrutura-de-diretórios)  
7. [Configuração](#-configuração)  
8. [Uso](#-uso)  

---

## 🔍 Descrição do Projeto  

O sistema permite gerenciar motoristas, visualizar rotas entre origens e destinos e consultar históricos de viagens com filtros personalizáveis.  

- **Frontend:** Oferece uma interface interativa para buscas e visualização das viagens.  
- **Backend:** Lida com as regras de negócio e comunicação com um banco de dados MySQL, fornecendo endpoints RESTful para suportar as funcionalidades do sistema.  

### Funcionalidades do Backend:  
- Cadastro e gerenciamento de motoristas e viagens.  
- Filtragem de viagens por cliente ou motorista.  
- Trajeto entre origem e destino utilizando Google Maps Directions API.  
- Comunicação com banco de dados para persistência de dados.  

---

## ✨ Principais Funcionalidades  

1. **Frontend:**  
   - Busca de histórico de viagens com filtros por cliente ou motorista.  
   - Visualização de rotas com integração ao Google Maps.  
   - Interface responsiva usando Material-UI.  

2. **Backend:**  
   - API RESTful para gerenciar motoristas, viagens e usuários.  
   - Integração com o banco de dados MySQL.  
   - Endpoints configurados para consultas otimizadas e dinâmicas.  

---

## 💻 Tecnologias Utilizadas  

- **Frontend:**  
  - React.js  
  - TypeScript  
  - Material-UI  
  - Axios  
  - React Query  
  - Google Maps JavaScript API  

- **Backend:**  
  - Node.js  
  - Express.js  
  - MySQL  

- **Gerenciamento de Estado:**  
  - Recoil  

- **Contêinerização:**  
  - Docker e Docker Compose  

---

## 📦 Pré-requisitos  

- Node.js (v16 ou superior).  
- Docker e Docker Compose instalados.  
- Uma conta no Google Cloud com a **Google Maps JavaScript API** habilitada.  

---

## 🚀 Instalação  

### 1. Clonar o Repositório  

```bash
git clone https://github.com/seu-usuario/taxi-app.git
cd taxi-app
```

## 2. Configuração das Variáveis de Ambiente

Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis de ambiente:

- `GOOGLE_API_KEY`: Chave da API do Google Maps, necessária para utilizar os recursos de rotas e mapas.
- `MYSQL_HOST`: Defina como `localhost` se estiver rodando o banco de dados localmente.
- `PORT`: Defina a porta que o backend irá usar (por padrão, `8080`).

Caso esteja utilizando o Docker para rodar o banco de dados, somente a variável `GOOGLE_API_KEY` será necessária. O Docker já estará configurado para rodar o banco de dados MySQL automaticamente.

Exemplo de arquivo `.env`:

```bash
GOOGLE_API_KEY=your_google_api_key_here
MYSQL_HOST=localhost
PORT=8080

```
## 3. Inicialização do Projeto

### Usando Docker

1. **Certifique-se de não ter cache de volume**, para evitar erros com versões antigas e dependências. Para isso, rode o comando:

    ```bash
    docker-compose down --volumes
    ```

2. **Inicie o projeto** executando o comando:

    ```bash
    docker-compose up
    ```

3. Com isso, o Docker irá subir o **frontend**, **backend**, e o **banco de dados MySQL** automaticamente.

### Sem Docker

Caso prefira não utilizar o Docker para o banco de dados, você pode rodar o **backend** e o **frontend** localmente da seguinte forma:

- **Backend**: Primeiro rode o comando:
    ```bash
    yarn install
    yarn run db:seed
    yarn dev
    ```

- **Frontend**: Execute o frontend com React normalmente:

    ```bash
    yarn install
    yarn dev
    ```

## 4. Back-End

O back-end do projeto é responsável por fornecer a lógica de negócio, interagir com o banco de dados e fornecer as APIs que o front-end consome. Ele foi construído utilizando **Node.js**, **Express** e **MySQL**.

### Funcionalidades Principais

- **Gerenciamento de Motoristas**: O back-end permite cadastrar, editar e listar motoristas disponíveis para as corridas.
- **Gerenciamento de Corridas**: Criação de corridas entre clientes e motoristas, com a possibilidade de filtrar o histórico de corridas por motorista ou cliente.
- **Integração com Google Maps**: Para calcular as rotas entre a origem e o destino, o back-end integra-se com a API do Google Maps para fornecer as direções.

### Variáveis de Ambiente

A seguir, estão as variáveis de ambiente necessárias para o funcionamento do back-end:

- `MYSQL_HOST`: O endereço do servidor MySQL (pode ser `localhost` quando não usar o Docker).
- `MYSQL_USER`: Usuário do banco de dados MySQL.
- `MYSQL_PASSWORD`: Senha do banco de dados MySQL.
- `MYSQL_DB`: Nome do banco de dados.
- `GOOGLE_API_KEY`: A chave de API do Google Maps.

## 5. Execução do Projeto

### 5.1 Usando Docker

Se preferir usar o Docker para configurar e rodar o ambiente, você pode seguir os seguintes passos:

1. Certifique-se de estar na raiz do projeto.
2. Execute o comando para iniciar os containers:

  ```bash
  docker-compose up
  ```
  > **Nota:** Se você encontrar erros devido a cache de volumes antigos, execute o seguinte comando para parar e remover volumes antigos:

```bash
docker-compose down -v
```
### 5.2 Iniciando Sem Docker

Caso prefira não usar Docker, você pode configurar o banco de dados manualmente no seu ambiente local e iniciar as aplicações de front-end e back-end diretamente no terminal:

1. **Banco de Dados MySQL**:
   - Certifique-se de que o MySQL está rodando e que você configurou o banco de dados conforme as variáveis de ambiente.

2. **Iniciando o Back-End**:
   - Execute o comando abaixo para iniciar o servidor back-end:

   ```bash
   yarn install
   yarn db:seed
   yarn dev
   ```

3. **Iniciando o Front-End**:
   - Em seguida, inicie o front-end com o seguinte comando:

   ```bash
   yarn install
   yarn dev
   ```

Isso irá configurar e iniciar as duas partes do sistema separadamente sem a necessidade do Docker.
## 6. Estrutura de Pastas e Arquivos

A estrutura de pastas do projeto é organizada da seguinte forma:

### Explicação das Pastas:

- **backend/**: Contém toda a lógica do servidor, incluindo configurações de banco de dados, controladores para as rotas, modelos de dados e utilitários.
- **frontend/**: Contém o código do front-end desenvolvido com React. Todos os componentes, páginas e serviços são organizados dentro dessa pasta.
- **.env**: Arquivo onde você configura variáveis de ambiente necessárias para o projeto (como a chave da API do Google).
- **docker-compose.yml**: Arquivo que orquestra os containers Docker para o back-end, front-end e banco de dados, caso você opte por usar Docker.
- **package.json**: Define as dependências e scripts para o gerenciamento do projeto.

A estrutura de pastas foi projetada para garantir que o projeto seja fácil de gerenciar e escalar, mantendo as responsabilidades de cada parte do sistema bem definidas.


## ⚙️ Configuração

Para iniciar o projeto, você precisará configurar as variáveis de ambiente para o front-end e back-end. Ambas as variáveis estarão no mesmo arquivo `.env`, localizado na raiz do projeto.

### 1. Variáveis de Ambiente

O arquivo `.env` contém as variáveis necessárias para a configuração do banco de dados, do serviço de API e da chave da API do Google Maps. Exemplos das variáveis de ambiente para o front-end e back-end:

**Exemplo de conteúdo do arquivo `.env`**  
```
MYSQL_HOST=localhost
PORT=8080
GOOGLE_API_KEY=your-google-api-key-here
```

### 2. Back-end

O back-end do projeto é uma API que gerencia dados como motoristas, clientes e viagens. Ele foi construído usando o Node.js com Express, MySQL e outras bibliotecas úteis. Ele fornece rotas para criar, listar e filtrar viagens, além de manipular dados do banco de dados.

Algumas das principais funcionalidades incluem:

- **API de motoristas:** Registra e recupera motoristas.
- **API de viagens:** Cria e lista viagens, incluindo filtragem por motorista.
- **Banco de dados MySQL:** Usado para armazenar informações sobre motoristas e viagens.

### 3. Front-end

O front-end é construído com React, utilizando o Material UI para a interface. Ele se conecta à API do back-end para exibir dados e permitir que o usuário interaja com o sistema. Algumas das funcionalidades do front-end incluem:

- **Tela de Histórico de Viagens:** Permite que o usuário busque o histórico de viagens de um cliente, filtrando por motorista.
- **Mapas com Google Maps:** Mostra a origem e o destino das viagens no Google Maps, com direções entre os pontos.


### 📖 Uso

- Acesse o frontend em http://localhost:80.
- Realize buscas no histórico de viagens ou visualize rotas no Google Maps.

### 🤖 Créditos
Este README foi aprimorado com a ajuda de uma inteligência artificial integrada ao VS Code.

Desenvolvido com ❤️ por Márllon César.