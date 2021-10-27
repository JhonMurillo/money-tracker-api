import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: process.env.PORT,

    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtTokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
    bearer: process.env.BEARER
}));
