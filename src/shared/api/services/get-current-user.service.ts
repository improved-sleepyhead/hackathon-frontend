import { getAccessToken } from "./auth-token.service";
import { parseJwt } from "./parse-jwt.service";

export const getUserEmail = (): string | null => {
  const accessToken = getAccessToken();
  console.log('Access token:', accessToken);
  if (!accessToken) return null;

  const payload = parseJwt(accessToken);
  console.log('Decoded JWT:', payload);
  return payload?.email ?? null;
};
