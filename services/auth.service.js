import jwt from "jsonwebtoken";
import prisma from "../database.js";
import * as argon2 from "argon2";
import { config } from "../config.js";

export async function login(req, res, next) {
  /* 
  #swagger.tags = ['Auth']
  #swagger.description = 'Login'
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: '#/components/schemas/LoginUserDto'
    }
  }
  #swagger.responses[200] = {
    description : 'Login successful',
    content: {
      "application/json" : {
        schema: {
          $ref: '#/components/schemas/LoginResponseDto'
        }
      }
    }
  }
  #swagger.responses[401] = {
    description : 'Unauthorized',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ErrorDto'
        }
      }
    }
  }
  */
  const { username, password } = req.body;
  await prisma.user
    .findUnique({
      where: { username: username, deleted_at: null },
    })
    .then(async (user) => {
      if (await argon2.verify(user.password, password)) {
        const access_token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          config.secret
        );
        return res.status(200).json({ access_token: access_token });
      }
    })
    .catch((error) => {
      return res.status(401).json({ message: "Unauthorized" });
    });
}

export async function me(req, res, next) {
  /* 
  #swagger.tags = ['Auth']
  #swagger.description = 'Get user info'
  #swagger.responses[200] = {
    description : 'User info',
    content: {
      "application/json" : {
        schema: {
          $ref: '#/components/schemas/MeResponseDto'
        }
      }
    }
  }
  #swagger.responses[401] = {
    description : 'Unauthorized',
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

  const token = req.get("Authorization").split(" ")[1];
  const decoded = jwt.verify(token, config.secret);

  await prisma.user
    .findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(401).json({ message: "Unauthorized" });
    });
}

export async function register(req, res, next) {
  /* 
  #swagger.tags = ['Auth']
  #swagger.description = 'register admin'
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: '#/components/schemas/CreateUserDto'
    }
  }
  #swagger.responses[204] = {
    description : 'Admin created'
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
