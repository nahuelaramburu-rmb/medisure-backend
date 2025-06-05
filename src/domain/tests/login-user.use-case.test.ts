import { LoginUser } from './../use-cases/auth/login-user.use-case';

describe('LoginUser - expiración de contraseña', () => {
  const mockSignedToken = jest.fn().mockResolvedValue('mocked.jwt.token');
  const baseUser = {
    id: '1',
    name: 'Test',
    email: 'test@mail.com',
    password: 'Password123!',
    createdAt: new Date(),
    passwordChangedAt: undefined,
  };

  it('debe permitir login si la contraseña fue cambiada hace menos de 90 días', async () => {
    const user = { ...baseUser, passwordChangedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }; // 60 días atrás
    const mockRepo = { login: jest.fn().mockResolvedValue(user) };

    const useCase = new LoginUser(mockRepo as any, mockSignedToken);
    const result = await useCase.execute({ email: user.email, password: user.password });
    expect(result.token).toBe('mocked.jwt.token');
  });

  it('debe rechazar login si la contraseña fue cambiada hace más de 90 días', async () => {
    const user = { ...baseUser, passwordChangedAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) }; // 100 días atrás
    const mockRepo = { login: jest.fn().mockResolvedValue(user) };

    const useCase = new LoginUser(mockRepo as any, mockSignedToken);
    await expect(useCase.execute({ email: user.email, password: user.password }))
      .rejects
      .toThrow('Password expired, please change your password.');
  });
});