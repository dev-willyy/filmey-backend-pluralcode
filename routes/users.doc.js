const listAllUsers = {
  tags: ['User'],
  summary: 'Get all current subscribers',
  description: 'List all of the current Subscribers/Users',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User',
            },
            example: [
              {
                id: 1,
                username: 'johndoe',
                email: 'johndoe@example.com',
              },
              {
                id: 2,
                username: 'janedoe',
                email: 'janedoe@example.com',
              },
            ],
          },
        },
      },
    },
  },
};

const usersRouteDoc = {
  '/api/pluraltask/users': {
    get: listAllUsers,
  },
};

export { usersRouteDoc };
