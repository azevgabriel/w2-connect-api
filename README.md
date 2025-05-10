## Roteiros de Viagem com processamente assíncrono de reservas.

### Rotas

- [ ] POST `/users` (Criação de usuário)
  - [ ] POST `/auth` (Login do usuário)
- [ ] `/trips`
  - [ ] POST (Criação de viagem)
  - [ ] GET (Listagem de viagens)
    - [ ] Filter by `status`
  - [ ] GET `/:id` (Exibir detalhes da viagem)
    - [ ] Include `reservations` (Incluindo todas as reservas)
  - [ ] PUT `/:id` (Alterar viagem)
- [ ] `/reservations`
  - [ ] POST (Adicionar reservas)
    - [ ] Include `async` with SQS or RabbitMQ
  - [ ] PUT `/:id` (Editar reservas)
  - [ ] PATCH `/:id` (Remover reservas)
    - [ ] Status `cancelled`

### Tecnologias

- [ ] (Infra) Docker-compose
- [ ] (Gerenciamento de filas) SQS ou RabbitMQ
- [ ] (Observabilidade) Winston ou Pino para logs

### Como rodar o projeto?

### Decisões arquiteturais

### Documentação básica da API
