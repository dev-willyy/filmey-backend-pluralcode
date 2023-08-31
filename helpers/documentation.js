import { authRouteDoc } from '../routes/auth.doc.js';
import { usersRouteDoc } from '../routes/users.doc.js';

const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation for Movie Streaming App - Pluralcode Task',
    version: '1.0.0',
    description: 'This is the backend infrastructure for a movie-streaming App called Filmey',
  },
  servers: [
    {
      url: 'http://localhost:3003',
      description: 'Local development environment',
    },
    {
      url: 'https://pluraltask.onrender.com',
      description: 'Production environment',
    },
  ],
  tags: [
    {
      name: 'User',
      description: 'User routes',
    },
    {
      name: 'Auth',
      description: 'Authentication routes',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'Name of user',
            example: 'johndoe',
          },
          email: {
            type: 'string',
            description: 'Email address of user',
            example: 'johndoe@example.com',
          },
          password: {
            type: 'string',
            description: 'Password of user',
          },
          isAdmin: {
            type: 'boolean',
            description: 'Indicates if user will have Admin rights or not',
          },
        },
      },
    },
  },
  paths: {
    ...usersRouteDoc,
    ...authRouteDoc,
  },
};

export default swaggerDocumentation;
