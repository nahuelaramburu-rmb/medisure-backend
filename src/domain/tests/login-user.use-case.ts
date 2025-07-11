import { LoginUser } from '../use-cases/auth/login-user.use-case';

describe('LoginUser - password expired', () => {
  const mockSignedToken = jest.fn().mockResolvedValue('mocked.jwt.token');
  const baseUser = {
    id: '1',
    name: 'Test',
    email: 'test@mail.com',
    password: 'Password123!',
    created_at: new Date(),
    password_changed_at: undefined,
  };

  it('Should accept the password if it was create before 90 days', async () => {
    const user = { ...baseUser, password_changed_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }; // 60 days ago
    const mockRepo = { login: jest.fn().mockResolvedValue(user) };
    const ip = "0.0.0.0.";
    const useCase = new LoginUser(mockRepo as any, mockSignedToken);
    const result = await useCase.execute({ email: user.email, password: user.password }, ip);
    expect(result.token).toBe('mocked.jwt.token');
  });

  it('should reject if the password was created 90 days ago', async () => {
    const user = { ...baseUser, password_changed_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) }; // 100 días atrás
    const mockRepo = { login: jest.fn().mockResolvedValue(user) };
    const ip = "0.0.0.0.";
    const useCase = new LoginUser(mockRepo as any, mockSignedToken);
    await expect(useCase.execute({ email: user.email, password: user.password }, ip))
      .rejects
      .toThrow('Password expired, please change your password.');
  });
});