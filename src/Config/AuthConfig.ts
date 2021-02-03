export default {
  secret: process.env.APP_SECRET as string,
  expiresIn: process.env.EXPIRES_IN as string,
};
