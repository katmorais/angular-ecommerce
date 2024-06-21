import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export function getRoleFromToken(token: string): string {
  const decodedToken = helper.decodeToken(token);

  if (!decodedToken) {
    throw new Error('Invalid token');
  }

  return decodedToken.groups[0];
}
