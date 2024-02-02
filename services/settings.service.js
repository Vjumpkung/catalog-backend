import prisma from "../database.js";

export function get_settings(req, res, next) {
  /*
  #swagger.tags = ['Settings']
  #swagger.description = 'Endpoint to get settings.'
  #swagger.responses[200] = {
    description: 'Settings retrieved successfully.',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/GetSettingsDto'
        }
      }
    }
  }
  */

  prisma.setting
    .findFirstOrThrow()
    .then((settings) => {
      return res.status(200).json(settings);
    })
    .catch((err) => {
      prisma.setting
        .create({
          data: {
            name: "Catalog",
            logo: "https://via.placeholder.com/150",
          },
        })
        .then((settings) => {
          return res.status(200).json(settings);
        });
    });
}

export function update_settings(req, res, next) {
  /*
  #swagger.tags = ['Settings']
  #swagger.description = 'Endpoint to update settings.'
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: '#/components/schemas/UpdateSettingsDto'
    }
  }
  #swagger.responses[204] = {
    description: 'Settings updated successfully.'
  }
  */

  prisma.setting.findFirst().then((settings) => {
    const id = settings.id;
    prisma.setting
      .update({
        where: {
          id: id,
        },
        data: {
          name: req.body.name,
          logo: req.body.logo,
        },
      })
      .then((settings) => {
        return res.status(204).send();
      });
  });
}
