import prisma from "../database.js";

import * as argon2 from "argon2";

export async function get_users(req, res, next) {
  /* 
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint to create a new user'
  #swagger.responses[200] = {
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/UserResponseDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const users = await prisma.user.findMany({
    where: {
      deleted_at: null,
    },
    select: {
      id: true,
      username: true,
      created_at: true,
      password: false,
    },
  });
  await res.json(users);
}

export async function create_user(req, res, next) {
  /* 
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint to create a new user'
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: '#/components/schemas/CreateUserDto'
    }
  }
  #swagger.responses[204] = {
    description : 'User created'
  }
  #swagger.responses[400] = {
    description : 'User already exists',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ErrorDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */

  const { username, password } = req.body;
  await prisma.user
    .create({
      data: {
        username: username.toString(),
        password: await argon2.hash(password),
        created_at: new Date(),
      },
    })
    .then((user) => {
      return res.status(204).send();
    })
    .catch((e) => {
      return res.status(400).json({ error: "User already exists" });
    });
}

export async function update_user(req, res, next) {
  /* 
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint to update a user'
  #swagger.parameters['id'] = { description: 'User ID' }
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: '#/components/schemas/UpdateUserDto'
    }
  }
  #swagger.responses[204] = {
    description : 'User updated'
  }
  #swagger.responses[400] = {
    description : 'Username already exists',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ErrorDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const { newUsername, oldPassword, newPassword } = req.body;

  await prisma.user
    .update({
      where: {
        id: req.params.id,
      },
      data: {
        username: newUsername ? newUsername : undefined,
        password: newPassword ? await argon2.hash(newPassword) : undefined,
      },
    })
    .then((user) => {
      return res.status(204).send();
    })
    .catch((e) => {
      return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
    });
}

export async function delete_user(req, res, next) {
  /* 
  #swagger.tags = ['Users']
  #swagger.description = 'Endpoint to delete a user'
  #swagger.responses[204] = {
    description : 'User deleted'
  }
  #swagger.responses[404] = {
    description : 'User not found',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ErrorDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  await prisma.user
    .update({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
      },
    })
    .then((user) => {
      return res.status(204).send();
    })
    .catch((e) => {
      return res.status(404).json({ error: "User not found" });
    });
}
