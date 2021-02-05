export default {
  async getVerificationCode(): Promise<never> {
    throw new Error('method not implemented');
  },

  async verifyCode(): Promise<never> {
    throw new Error('method not inmplemented');
  },

  async resetPassword(): Promise<never> {
    throw new Error('method not inmplemented');
  },
};
