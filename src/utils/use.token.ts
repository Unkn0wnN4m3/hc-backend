import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken => {
  const decode = jwt.decode(token) as AuthTokenResult;

  return {
    sub: decode.sub,
    role: decode.role,
  };
};

export const verifyAccessToken = (token: string): IUseToken | string => {
  try {
    const verify = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
    ) as AuthTokenResult;
    return { sub: verify.sub, role: verify.role };
  } catch (error) {
    return error.message;
  }
};

export const verifyRefreshToken = (token: string): IUseToken | string => {
  try {
    const verify = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET,
    ) as AuthTokenResult;
    return { sub: verify.sub, role: verify.role };
  } catch (error) {
    return error.message;
  }
};
