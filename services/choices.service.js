import prisma from "../database.js";

export function create_choice(req, res, next) {
  /*
  #swagger.tags = ['Choices']
  #swagger.description = 'Endpoint to create a choice.'
  #swagger.requestBody = {
    description: 'Choice object',
    required: true,
    schema: {
      $ref: '#/components/schemas/CreateChoiceDto'
    }
  }
  #swagger.responses[201] = {
    description: 'Choice created successfully.',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ChoiceResponseDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const body = req.body;
  prisma.choices
    .create({
      data: { ...body, created_at: new Date() },
      select: { id: true, name: true, price: true, created_at: true },
    })
    .then((choice) => {
      return res.status(201).json(choice);
    });
}

export function get_choices(req, res, next) {
  /* 
  #swagger.tags = ['Choices']
  #swagger.description = 'Endpoint to get all choices.'
  #swagger.responses[200] = {
    description: 'Choices retrieved successfully.',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/AllChoicesResponseDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  prisma.choices
    .findMany({
      where: { deleted_at: null },
      select: { id: true, name: true, price: true, created_at: true },
      orderBy: [{ created_at: "desc" }],
    })
    .then((choices) => {
      return res.status(200).json(choices);
    });
}

export function get_choice_by_id(req, res, next) {
  /* 
  #swagger.tags = ['Choices']
  #swagger.description = 'Endpoint to get choices by id.'
  #swagger.responses[200] = {
    description: 'Choices retrieved successfully.',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/ChoiceResponseDto'
        }
      }
    }
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const id = req.params.id;
  prisma.choices
    .findUnique({
      where: { id: id, deleted_at: null },
      select: { id: true, name: true, price: true, created_at: true },
    })
    .then((choices) => {
      return res.status(200).json(choices);
    });
}

export function update_choice(req, res, next) {
  /* 
  #swagger.tags = ['Choices']
  #swagger.description = 'Update Choice by id.'
  #swagger.parameters['id'] = { description: 'Choice ID.' }
  #swagger.requestBody = {
    description: 'Choice object',
    required: true,
    schema: {
      $ref: '#/components/schemas/UpdateChoiceDto'
    }
  }
  #swagger.responses[204] = {
    description: 'Choices update successfully.'
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */
  const id = req.params.id;
  const body = req.body;
  prisma.choices
    .update({
      where: { id: id, deleted_at: null },
      data: body,
    })
    .then(() => {
      return res.status(204).send();
    });
}

export function delete_choice(req, res, next) {
  /* 
  #swagger.tags = ['Choices']
  #swagger.description = 'Delete Choice by id.'
  #swagger.parameters['id'] = { description: 'Choice ID.' }
  #swagger.responses[204] = {
    description: 'Choices delete successfully.'
  }
  #swagger.security = [{
            "bearerAuth": []
  }]
  */

  const id = req.params.id;
  prisma.choices
    .update({
      where: { id: id, deleted_at: null },
      data: { deleted_at: new Date() },
    })
    .then(() => {
      return res.status(204).send();
    });
}
