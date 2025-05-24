import { getAccessToken } from "./auth-token.service";
import { parseJwt } from "./parse-jwt.service";

export const getUserEmail = (): string | null => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const payload = parseJwt(accessToken);
  return payload?.email ?? null;
};
