describe('Forgot Password', () => {
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  it('should not be able to request password change with wrong email', () => {
    throw new Error('not implemented');
  });

  it('should not be able to request password change with wrong code', () => {
    throw new Error('not implemented');
  });

  it('should not be able to change the users password with wrong current password', () => {
    throw new Error('not implemented');
  });

  it('should be able to change the users password', () => {
    throw new Error('not implemented');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });
});
