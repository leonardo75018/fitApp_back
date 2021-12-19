import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import mailConfig from '@config/mail/mail';
import SESMail from '@config/mail/SESMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          firstName: user.firstName,
          email: user.email,
        },
        subject: '[Fitness App] Mot de passe oublié',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.firstName,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
          },
        },
      });
      return;
    }

    await EtherealMail.sendMail({
      to: {
        firstName: user.firstName,
        email: user.email,
      },
      subject: '[Fitness App] Mot de passe oublié',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.firstName,
          link: `${process.env.API_API_URL}=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
