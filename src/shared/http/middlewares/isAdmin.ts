import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

export default function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { user } = request;

  const userRepository = new UsersRepository();

  if (user.id) {
    throw new AppError('JWT Token is missing.');
  }
  // Bearer sdlkfjsldkfjlsjfffdklfjdflksjflkjfdlk3405905
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
