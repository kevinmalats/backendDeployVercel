import dotenv = require('dotenv');
dotenv.config();

export const CONSTANS = {
  jwt: {
    secret: process.env.SECRET_KEY,
  },
};
