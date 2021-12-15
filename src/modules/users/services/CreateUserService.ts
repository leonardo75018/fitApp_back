import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

class CreateUserService {
  public async execute({
    firstName,
    lastName,
    email,
    password,
    role,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
