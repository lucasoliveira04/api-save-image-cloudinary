## 📸 API Save Images

API RESTful desenvolvida com **TypeScript** e **Express** que permite:

- 📤 Upload de imagens para o **Cloudinary**
- 📂 Listagem dos `public_id` das imagens armazenadas
- 🔎 Busca de uma imagem específica pelo seu `public_id`

---

### 📁 Estrutura do Projeto

```
src/
│
├── config/               # Configuração do Cloudinary
│
├── controller/           # Controllers com rotas da API
│
├── routes/               # Configuração global das rotas
│
├── services/             # Lógica de serviços (upload, busca, listagem)
│
├── index.ts              # Arquivo principal do servidor
│
├── config/Controller.ts  # Classe abstrata base para os controllers
│
└── docs/swagger.yaml     # Documentação da API via Swagger
```

---

### 🚀 Funcionalidades

| Método | Rota                    | Descrição                                  |
| ------ | ----------------------- | ------------------------------------------ |
| POST   | `/api/uploadFile`       | Envia uma imagem para o Cloudinary         |
| GET    | `/api/getListAllImages` | Lista os `public_id` das imagens           |
| GET    | `/api/getImage/:id`     | Busca a URL da imagem usando o `public_id` |

---

### 🛠️ Tecnologias Utilizadas

- [x] Node.js
- [x] TypeScript
- [x] Express
- [x] Multer
- [x] Cloudinary SDK
- [x] Swagger UI Express

---

### 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/lucasoliveira04/api-save-image-cloudinary.git
cd api-save-images

# Instale as dependências
npm install

# Crie o arquivo .env com suas credenciais do Cloudinary
```

#### `.env` exemplo:

```
NODE_CLOUDINARY_CLOUD_NAME=seu-cloud-name
NODE_CLOUDINARY_API_KEY=sua-api-key
NODE_CLOUDINARY_API_SECRET=sua-api-secret
```

---

### ▶️ Executando o projeto

```bash
# Em ambiente de desenvolvimento
npm run start
```

A API estará disponível em:
📍 `http://localhost:3000/api`

---

### 📑 Documentação Swagger

Acesse a documentação interativa da API:
📎 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

---

### 🧪 Teste dos Endpoints

Você pode usar ferramentas como:

- Postman
- Thunder Client (VSCode)
- Insomnia
