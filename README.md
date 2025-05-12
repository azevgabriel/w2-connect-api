## 🧳 Roteiros de Viagem com Processamento Assíncrono de Reservas

### ✅ Rotas Implementadas

#### 👤 Usuários & Autenticação

- `POST /users` – Criação de usuário
- `POST /auth` – Login do usuário

#### ✈️ Viagens (`/trips`)

- `POST /trips` – Criar nova viagem
- `GET /trips` – Listar viagens

  - Suporte a filtro por `status`

- `GET /trips/:id` – Detalhes da viagem

  - Inclui as `reservations` (todas as reservas da viagem)

- `PUT /trips/:id` – Atualizar viagem

#### 📆 Reservas (`/reservations`)

- `POST /reservations` – Criar reserva

  - Processamento assíncrono via **SQS** ou **RabbitMQ**

- `PUT /reservations/:id` – Atualizar reserva
- `PATCH /reservations/:id` – Cancelar reserva

  - Status alterado para `cancelled`

---

### 🛠️ Tecnologias Utilizadas

- 🐳 **Docker Compose** – Orquestração de containers
- 📬 **SQS** ou **RabbitMQ** – Gerenciamento de filas
- 📄 **Winston** ou **Pino** – (Pendente) Observabilidade via logs

---

### 🛡️ Segurança e Boas Práticas (Pendentes)

- [ ] Restringir acesso a dados de outros usuários
- [ ] Sanitização de entrada (evitar injeções como `${alert("Inject")}` ou `<script></script>`)

---

### ▶️ Como Rodar o Projeto?

```bash
docker-compose up --build
```

- Certifique-se de criar um arquivo `.env.production` baseado no `.env.example`

---

### 🧱 Decisões Arquiteturais

- Aplicação estruturada com princípios **S.O.L.I.D**
- Paciência com o RabbitMQ 😅

---

### 📚 Documentação da API

Acesse a documentação em:

```
/docs
```

---

Se quiser, posso gerar um `README.md` com formatação pronta para GitHub. Deseja isso?
