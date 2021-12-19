interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      firstName: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'leonardo.kabongo@gmail.com',
      firstName: 'leonardo Kabongo',
    },
  },
} as IMailConfig;
