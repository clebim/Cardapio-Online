import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../../../Config/AuthConfig';
import User from '../Entities/User';
import { sessionSchemaValidator } from '../Validators/Session/CreateSessionValidator';
import SessionDataInterface from '../../Interfaces/SessionDataInterface';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    if (
      !sessionSchemaValidator.isValidSync(request.body, { abortEarly: true })
    ) {
      const errorMessage = await sessionSchemaValidator
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

    const { email, password } = <SessionDataInterface>request.body;

    const userRepository = getRepository(User);

    const userExist = await userRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });

    if (!userExist) {
      return response.status(400).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return response.status(400).json({
        success: false,
        message: 'Senha inválida',
      });
    }

    const { id } = userExist;

    return response.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      access_token: jwt.sign({ id }, authConfig.secret as string, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
