/* eslint-disable radix */
export default {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
};
