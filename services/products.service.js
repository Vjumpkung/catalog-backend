import prisma from "../database.js";

export async function get_products(req, res, next) {
  /*
  #swagger.tags = ['Products']
  #swagger.description = 'Endpoint to get all products.'
  #swagger.parameters['status'] = {
    in: 'query',
    description: 'Status of the products',
    required: true,
    type: 'string',
    schema: {
      @enum: ['all', 'published']
    }
  }
  #swagger.responses[200] = {
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ProductsAllResponseDto'
        }
      }
    }
  }
  */

  const query = req.query.status;

  await prisma.product
    .findMany({
      where: {
        deleted_at: null,
      },
      orderBy: [
        {
          published_at: { sort: "desc", nulls: "last" },
        },
      ],
    })
    .then((products) => {
      const x = products.map((product) => {
        const y = product.choices.map((choice) => {
          return prisma.choices
            .findUnique({
              where: {
                id: choice,
                deleted_at: null,
              },
              select: {
                id: true,
                name: true,
                price: true,
              },
            })
            .then((choice) => {
              return choice;
            });
        });
        return Promise.all(y).then((choices) => {
          product.choices = choices.filter((choice) => choice !== null);
          return product;
        });
      });
      Promise.all(x).then((products) =>
        res.status(200).json(
          products.filter((product) => {
            if (query === "published") {
              return product.published_at !== null;
            }
            return true;
          })
        )
      );
    });
}

export async function create_product(req, res, next) {
  /*
  #swagger.tags = ['Products']
  #swagger.description = 'Endpoint to create a product.'
  #swagger.requestBody = {
    description: 'Product object',
    required: true,
    schema: {
      $ref: '#/components/schemas/ProductCreateDto'
    }
  }
  #swagger.responses[201] = {
    description: 'Product created successfully.',
    schema: {
      $ref: '#/components/schemas/ProductResponseDto'
    }
  }
  #swagger.responses[400] = {
    description: 'Invalid request body.',
    schema: {
      $ref: '#/components/schemas/ErrorDto'
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const body = req.body;
  const productCreateDto = {
    name: body.name,
    price: body.price,
    description: body.description,
    choices: body.choices,
    images: body.images,
    published_at: body.published_at ? new Date(body.published_at) : undefined,
  };

  prisma.product
    .create({
      data: {
        name: productCreateDto.name,
        price: productCreateDto.price,
        description: productCreateDto.description,
        images: productCreateDto.images,
        published_at: productCreateDto.published_at,
        choices: productCreateDto.choices,
      },
    })
    .then((product) => {
      return res.status(201).json(product);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: error.message });
    });
}

export async function get_products_by_id(req, res, next) {
  /*
  #swagger.tags = ['Products']
  #swagger.description = 'Endpoint to get a product by id.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Product id',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ProductResponseDto'
        }
      }
    }
  }
  */
  const id = req.params.id;
  prisma.product
    .findUnique({
      where: {
        id: id,
        deleted_at: null,
      },
    })
    .then((product) => {
      const x = product.choices.map((choice) => {
        return prisma.choices
          .findUnique({
            where: {
              id: choice,
              deleted_at: null,
            },
            select: {
              id: true,
              name: true,
              price: true,
            },
          })
          .then((choice) => {
            return choice;
          });
      });
      Promise.all(x).then((choices) => {
        product.choices = choices.filter((choice) => choice !== null);
        return res.status(200).json(product);
      });
    });
}

export async function update_product(req, res, next) {
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Endpoint to update a product.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Product id',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      description: 'Product object',
      required: true,
      schema: {
        $ref: '#/components/schemas/ProductUpdateDto'
      }
    }
    #swagger.responses[204] = {
      description: 'Product updated successfully.'
    }
    #swagger.security = [{
              "bearerAuth": []
    }]
  */
  const id = req.params.id;
  const body = req.body;
  const productUpdateDto = {
    name: body.name,
    price: body.price,
    description: body.description,
    choices: body.choices,
    images: body.images,
  };

  prisma.product
    .update({
      where: { id: id, deleted_at: null },
      data: {
        name: productUpdateDto.name,
        price: productUpdateDto.price,
        description: productUpdateDto.description,
        images: productUpdateDto.images,
        choices: productUpdateDto.choices,
      },
    })
    .then((product) => {
      return res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
}

export async function change_status_product(req, res, next) {
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Endpoint to change the status of a product.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Product id',
      required: true,
      type: 'string'
    }
    #swagger.parameters['status'] = {
      in: 'query',
      description: 'Status of the product',
      required: true,
      type: "string",
      schema: {
        @enum: [false, true]
      }
    }
    #swagger.responses[204] = {
      description: 'Status changed successfully.'
    }
    #swagger.security = [{
              "bearerAuth": []
    }]
  */
  const id = req.params.id;
  const status = req.query.status === "true";
  prisma.product
    .update({
      where: { id: id, deleted_at: null },
      data: {
        published_at: status ? new Date() : { set: null },
      },
    })
    .then((product) => {
      return res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
}

export async function delete_product(req, res, next) {
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Endpoint to delete a product.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Product id',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Product deleted successfully.'
    }
    #swagger.security = [{
              "bearerAuth": []
    }]
  */
  const id = req.params.id;
  prisma.product
    .update({
      where: { id: id, deleted_at: null },
      data: {
        deleted_at: new Date(),
      },
    })
    .then((product) => {
      return res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
}
