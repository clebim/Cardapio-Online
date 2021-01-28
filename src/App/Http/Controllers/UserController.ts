import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { userSchemaValidator } from '../Validators/User/CreateUserValidator';

import User from '../Entities/User';
import UserData from '../../Interfaces/UserDataInterface';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    // make the necessary validations
    if (
      !userSchemaValidator.isValidSync(request.body, {
        abortEarly: true,
      })
    ) {
      const errorMessage = await userSchemaValidator
        .validate(request.body, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      return response.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const userRepository = getRepository(User);

    const {
      restaurant_name,
      email,
      password,
      confirmation_password,
      city,
      neighborhood,
      street,
      number,
      zip_code,
    } = <UserData>request.body;

    if (password !== confirmation_password) {
      return response.status(400).json({
        success: false,
        message: 'Senha e confirmação de senha não podem ser diferentes',
      });
    }

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({
        success: false,
        message: 'Já existe um restautante cadastrado com este email',
      });
    }

    const newUser = userRepository.create({
      restaurant_name,
      email,
      password,
      city,
      neighborhood,
      street,
      number,
      zip_code,
    });

    await userRepository.save(newUser);

    return response.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        restaurant_name: newUser.restaurant_name,
      },
    });
  },
};
