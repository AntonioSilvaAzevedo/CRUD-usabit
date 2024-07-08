// src/mocks/handlers.ts
import { rest } from 'msw';

let clients = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];

export const handlers = [
  rest.get('/api/clients', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(clients));
  }),

  rest.post('/api/clients', (req, res, ctx) => {
    const newClient = req.body;
    clients.push({ ...newClient, id: clients.length + 1 });
    return res(ctx.status(201), ctx.json(newClient));
  }),

  rest.put('/api/clients/:id', (req, res, ctx) => {
    const { id } = req.params;
    const updatedClient = req.body;
    clients = clients.map((client) =>
      client.id === Number(id) ? { ...client, ...updatedClient } : client
    );
    return res(ctx.status(200), ctx.json(updatedClient));
  }),

  rest.delete('/api/clients/:id', (req, res, ctx) => {
    const { id } = req.params;
    clients = clients.filter((client) => client.id !== Number(id));
    return res(ctx.status(204));
  }),
];
