const registerUser = {
  tags: ['Auth'],
  summary: 'register a new subscriber/user',
  description: 'Create a new Subscriber/User',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          items: {
            $ref: '#/components/schemas/User',
          },
          example: {
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'newSubscriber001',
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'success',
              message: 'User has been successfully created',
            },
          },
        },
      },
    },
  },
};

const loginUser = {
  tags: ['Auth'],
  summary: 'Signs in a subscriber/user',
  description: 'Allows Subscriber/User sign in to their account',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          items: {
            $ref: '#/components/schemas/User',
          },
          example: {
            username: 'johndoe',
            password: 'newSubscriber001',
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              details: {
                _id: '23456t4ghgg78537',
                username: 'johndoe',
                email: 'johndoe@example.com',
                __v: 0,
              },
              isAdmin: true,
            },
          },
        },
      },
    },
  },
};

const authRouteDoc = {
  '/api/pluraltask/register': {
    post: registerUser,
  },
  '/api/pluraltask/login': {
    post: loginUser,
  },
};

export { authRouteDoc };
