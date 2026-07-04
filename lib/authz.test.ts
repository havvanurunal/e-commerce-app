import { redirect } from 'next/navigation';
import { auth0 } from './auth0';
import {
  AppRole,
  getRolesFromUser,
  hasRole,
  requireAdmin,
  requireUser,
  ROLES_CLAIM,
  tryGetRolesClaimFromIdToken,
} from './authz';

jest.mock('./auth0', () => ({
  auth0: {
    getSession: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

function useWithRoles(roles: AppRole[]) {
  return {
    sub: 'auth0|123',
    [ROLES_CLAIM]: roles,
  };
}

describe('tryGetRolesClaimFromIdToken', () => {
  it('returns roles from a valid token', () => {
    const payload = { [ROLES_CLAIM]: [AppRole.ADMIN] };
    const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');
    const mockToken = `header.${encoded}.signature`;
    expect(tryGetRolesClaimFromIdToken(mockToken)).toEqual([AppRole.ADMIN]);
  });
  it('returns [] when token is not a string ', () => {
    const token = 123;
    expect(tryGetRolesClaimFromIdToken(token)).toEqual([]);
  });
  it('returns [] when token format is invalid', () => {
    const token = 'invalid-token';
    expect(tryGetRolesClaimFromIdToken(token)).toEqual([]);
  });
});

describe('getRolesFromUser', () => {
  it('returns when user is null/undefined', () => {
    expect(getRolesFromUser(null)).toEqual([]);
  });
  it('returns when user[ROLES_CLAIM] is an array', () => {
    const user = useWithRoles([AppRole.ADMIN]);
    expect(getRolesFromUser(user)).toEqual([AppRole.ADMIN]);
  });
  it('returns when user[ROLES_CLAIM] is not an array', () => {
    const user = { [ROLES_CLAIM]: 'not-an-array' };
    expect(getRolesFromUser(user)).toEqual([]);
  });
});

describe('authz', () => {
  describe('hasRole', () => {
    it('returns true if the user has a role', () => {
      const adminUser = useWithRoles([AppRole.ADMIN]);
      expect(hasRole(adminUser, AppRole.ADMIN)).toBe(true);
    });
    it('returns false if the user is missing a role', () => {
      const adminUser = useWithRoles([]);
      expect(hasRole(adminUser, AppRole.ADMIN)).toBe(false);
    });
    it('returns false if the user is null', () => {
      expect(hasRole(null, AppRole.USER)).toBe(false);
    });
  });
});

describe('requireUser', () => {
  it('redirect to /auth/login if there is no user', async () => {
    (auth0.getSession as jest.Mock).mockResolvedValue(null);
    await requireUser();
    expect(redirect).toHaveBeenCalledWith('/auth/login');
  });
  it('returns user', async () => {
    (auth0.getSession as jest.Mock).mockResolvedValue({
      user: useWithRoles([AppRole.ADMIN]),
    });
    const result = await requireUser();
    expect(result).toEqual(useWithRoles([AppRole.ADMIN]));
  });
});

describe('requireAdmin', () => {
  it('redirect to /forbidden if the user is not admin', async () => {
    (auth0.getSession as jest.Mock).mockResolvedValue({
      user: useWithRoles([AppRole.USER]),
    });
    await requireAdmin();
    expect(redirect).toHaveBeenCalledWith('/forbidden');
  });
  it('returns admin', async () => {
    (auth0.getSession as jest.Mock).mockResolvedValue({
      user: useWithRoles([AppRole.ADMIN]),
    });
    const result = await requireAdmin();
    expect(result).toEqual(useWithRoles([AppRole.ADMIN]));
  });
});
