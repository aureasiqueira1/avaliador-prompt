---
trigger: model_decision
description: Regras para Geração de README
---

# Regras para Geração de README - Projetos NestJS

## Activation Mode

**Model Decision**: Model decides whether to apply the rule

**Description**: Aplique quando precisar criar ou atualizar um README.md completo para projetos NestJS TypeScript seguindo padrões de documentação profissional

## Content

### Estrutura Padrão do README

#### 1. Cabeçalho do Projeto

```markdown
# Nome do Projeto

[![Node.js Version](https://img.shields.io/node/v/@nestjs/core)](https://nodejs.org/)
[![NestJS Version](https://img.shields.io/badge/NestJS-v10.x-ea2845)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Breve descrição do projeto e seu propósito principal.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Executar](#como-executar)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Documentation](#api-documentation)
- [Contribuição](#contribuição)
- [Licença](#licença)
```

#### 2. Seção "Sobre o Projeto"

```markdown
## 📖 Sobre o Projeto

[Descrição detalhada do projeto, seus objetivos, funcionalidades principais e contexto de uso]

### Principais Funcionalidades

- ✅ [Funcionalidade 1]
- ✅ [Funcionalidade 2]
- ✅ [Funcionalidade 3]
- 🔄 [Funcionalidade em desenvolvimento]
- 📋 [Funcionalidade planejada]
```

#### 3. Seção "Tecnologias Utilizadas"

```markdown
## 🚀 Tecnologias Utilizadas

### Backend

- **[NestJS](https://nestjs.com/)** - Framework Node.js para construção de APIs escaláveis
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript com tipagem estática
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB e Node.js

### Autenticação & Segurança

- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas

### Validação & Documentação

- **[class-validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Swagger](https://swagger.io/)** - Documentação da API

### Desenvolvimento & Testes

- **[Jest](https://jestjs.io/)** - Framework de testes
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
```

#### 4. Seção "Arquitetura"

```markdown
## 🏗️ Arquitetura

Este projeto segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**:

### Camadas da Aplicação
```

src/
├── 📁 controllers/ # Camada de Apresentação (API endpoints)
├── 📁 lib/
│ ├── 📁 usecases/ # Camada de Aplicação (casos de uso)
│ ├── 📁 models/ # Camada de Infraestrutura (Mongoose models)
│ └── 📁 dtos/ # Data Transfer Objects
├── 📁 guards/ # Guardas de autenticação e autorização
├── 📁 filters/ # Filtros de exceção
└── 📁 pipes/ # Pipes de validação e transformação

```

### Padrões Utilizados

- **Clean Architecture**: Separação clara entre camadas
- **Use Cases**: Cada operação de negócio é um caso de uso específico
- **Command Pattern**: DTOs especializados para entrada de dados
- **Repository Pattern**: Abstração do acesso a dados (via Mongoose)
- **Dependency Injection**: Injeção de dependências nativa do NestJS
```

#### 5. Seção "Pré-requisitos"

````markdown
## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18.x ou superior)
- **npm** (versão 9.x ou superior) ou **yarn**
- **MongoDB** (versão 6.x ou superior)
- **Git**

### Verificar Instalações

```bash
node --version
npm --version
mongod --version
git --version
```
````

````

#### 6. Seção "Instalação"
```markdown
## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
````

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/nome-do-banco
MONGODB_URI=mongodb://localhost:27017/nome-do-banco

# JWT
JWT_SECRET=sua-chave-secreta-jwt
JWT_EXPIRES_IN=24h

# Application
PORT=3000
NODE_ENV=development

# Other configurations...
```

````

#### 7. Seção "Como Executar"
```markdown
## 🚀 Como Executar

### Desenvolvimento
```bash
# Modo desenvolvimento (com hot-reload)
npm run start:dev

# Modo debug
npm run start:debug
````

### Produção

```bash
# Build da aplicação
npm run build

# Executar em produção
npm run start:prod
```

### Docker (opcional)

```bash
# Build da imagem
docker build -t nome-do-projeto .

# Executar container
docker run -p 3000:3000 nome-do-projeto

# Ou usar docker-compose
docker-compose up -d
```

A aplicação estará disponível em `http://localhost:3000`

````

#### 8. Seção "Testes"
```markdown
## 🧪 Testes

### Executar todos os testes
```bash
npm test
````

### Testes em modo watch

```bash
npm run test:watch
```

### Testes de cobertura

```bash
npm run test:cov
```

### Testes e2e

```bash
npm run test:e2e
```

### Estrutura de Testes

```
test/
├── 📁 unit/           # Testes unitários
├── 📁 integration/    # Testes de integração
└── 📁 e2e/            # Testes end-to-end
```

````

#### 9. Seção "Estrutura do Projeto"
```markdown
## 📁 Estrutura do Projeto

````

src/
├── 📄 main.ts # Ponto de entrada da aplicação
├── 📄 app.module.ts # Módulo principal
├── 📄 app.controller.ts # Controller principal
├── 📄 app.service.ts # Service principal
├── 📁 controllers/ # Controllers da API
│ ├── 📄 auth.controller.ts
│ ├── 📄 users.controller.ts
│ └── 📄 ...
├── 📁 lib/ # Lógica de negócio
│ ├── 📁 usecases/ # Casos de uso
│ │ ├── 📁 auth/
│ │ │ ├── 📄 LoginUC.ts
│ │ │ ├── 📄 RegisterUC.ts
│ │ │ └── 📁 dtos/
│ │ └── 📁 users/
│ ├── 📁 models/ # Modelos Mongoose
│ │ ├── 📄 User.ts
│ │ ├── 📄 index.ts
│ │ └── 📄 ...
│ └── 📁 dtos/ # Data Transfer Objects
│ ├── 📄 CreateUserDTO.ts
│ └── 📄 ...
├── 📁 guards/ # Guardas de autenticação
├── 📁 filters/ # Filtros de exceção
├── 📁 pipes/ # Pipes de validação
├── 📁 decorators/ # Decorators customizados
└── 📁 utils/ # Utilitários

```

```

#### 10. Seção "API Documentation"

````markdown
## 📚 API Documentation

### Swagger UI

A documentação interativa da API está disponível em:

- **Local**: `http://localhost:3000/api`
- **Produção**: `https://seu-dominio.com/api`

### Principais Endpoints

#### Autenticação

```http
POST /auth/login
POST /auth/register
POST /auth/refresh
```
````

#### Usuários

```http
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

### Exemplos de Uso

#### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Criar Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{"name":"João Silva","email":"joao@example.com"}'
```

````

#### 11. Seção "Contribuição"
```markdown
## 🤝 Contribuição

Contribuições são sempre bem-vindas! Siga os passos abaixo:

### 1. Fork o projeto
### 2. Crie uma branch para sua feature
```bash
git checkout -b feature/nova-funcionalidade
````

### 3. Commit suas mudanças

```bash
git commit -m 'Add: nova funcionalidade'
```

### 4. Push para a branch

```bash
git push origin feature/nova-funcionalidade
```

### 5. Abra um Pull Request

### Padrões de Commit

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` tarefas de manutenção

### Code Review

Todo Pull Request deve:

- [ ] Ter testes cobrindo as mudanças
- [ ] Passar em todos os testes existentes
- [ ] Seguir os padrões de código (ESLint/Prettier)
- [ ] Ter descrição clara das mudanças

````

#### 12. Seção "Licença"
```markdown
## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

- **[Seu Nome](https://github.com/seu-usuario)** - Desenvolvedor Principal
- **[Nome do Colaborador](https://github.com/colaborador)** - Colaborador

## 🔗 Links Úteis

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do MongoDB](https://docs.mongodb.com/)
- [Documentação do Mongoose](https://mongoosejs.com/docs/)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
````

### Lista de Verificação para README Completo

- [ ] Título e badges informativos
- [ ] Descrição clara do projeto
- [ ] Índice navegável
- [ ] Seção sobre o projeto com funcionalidades
- [ ] Lista completa de tecnologias
- [ ] Arquitetura bem documentada
- [ ] Pré-requisitos claros
- [ ] Instruções de instalação passo a passo
- [ ] Configuração de variáveis de ambiente
- [ ] Múltiplas formas de executar (dev, prod, docker)
- [ ] Instruções de teste
- [ ] Estrutura do projeto detalhada
- [ ] Documentação da API com exemplos
- [ ] Guia de contribuição
- [ ] Informações de licença
- [ ] Links úteis e contatos

### Dicas Adicionais

1. **Mantenha atualizado**: Revisar o README sempre que houver mudanças significativas
2. **Use badges**: Adicionar badges para versões, build status, coverage, etc.
3. **Screenshots**: Incluir imagens quando apropriado
4. **Vídeos**: Links para demos ou tutoriais em vídeo
5. **Troubleshooting**: Seção com problemas comuns e soluções
6. **Changelog**: Link para arquivo de mudanças
7. **Roadmap**: Planos futuros do projeto
