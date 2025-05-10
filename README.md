## Roteiros de Viagem com processamente assíncrono de reservas.

### Rotas

- [x] POST `/users` (Criação de usuário)
  - [x] POST `/auth` (Login do usuário)
- [x] `/trips`
  - [x] POST (Criação de viagem)
  - [x] GET (Listagem de viagens)
    - [x] Filter by `status`
  - [x] GET `/:id` (Exibir detalhes da viagem)
    - [x] Include `reservations` (Incluindo todas as reservas)
  - [x] PUT `/:id` (Alterar viagem)
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

### Extras

- [ ] Evitar que outros usuários acessem dados que não são deles
- [ ] Evitar que o usuário envie `${alert("Inject")}` ou `<script></script>` dentro de uma row do banco.

### Como rodar o projeto?

### Decisões arquiteturais

### Documentação básica da API
