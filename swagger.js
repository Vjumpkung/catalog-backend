import swaggerAutogen from "swagger-autogen";
import IndexGetResponseDto from "./dto/IndexGetResponseDto.js";
import CreateUserDto from "./dto/CreateUserDto.js";
import UserResponseDto from "./dto/UsersResponseDto.js";
import LoginUserDto from "./dto/LoginUserDto.js";
import LoginResponseDto from "./dto/LoginResponseDto.js";
import UpdateUserDto from "./dto/UpdateUserDto.js";
import ErrorDto from "./dto/ErrorDto.js";
import MeResponseDto from "./dto/MeResponse.dto.js";
import ProductsAllResponseDto from "./dto/ProductsAllResponseDto.js";
import ProductCreateDto from "./dto/ProductCreateDto.js";
import ProductResponseDto from "./dto/ProductResponseDto.js";
import CreateChoiceDto from "./dto/CreateChoiceDto.js";
import ChoiceResponseDto from "./dto/ChoiceResponseDto.js";
import UpdateChoiceDto from "./dto/UpdateChoicedto.js";
import ProductUpdateDto from "./dto/ProductUpdateDto.js";
import UpdateSettingsDto from "./dto/UpdateSettingsDto.js";
import GetSettingsDto from "./dto/GetSettingsDto.js";
import AllChoicesResponseDto from "./dto/AllChoicesResponseDto.js";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: process.env.NAME,
    description: `This is the API documentation for the ${process.env.NAME} project.`,
  },
  servers: [
    {
      url: process.env.HOST,
    },
  ],
  components: {
    schemas: {
      IndexGetResponseDto,
      CreateUserDto,
      UserResponseDto,
      ErrorDto,
      LoginUserDto,
      LoginResponseDto,
      UpdateUserDto,
      MeResponseDto,
      ProductsAllResponseDto,
      ProductCreateDto,
      ProductResponseDto,
      CreateChoiceDto,
      ChoiceResponseDto,
      UpdateChoiceDto,
      ProductUpdateDto,
      UpdateSettingsDto,
      GetSettingsDto,
      AllChoicesResponseDto,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./public/docs.json";
const routes = ["./index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
