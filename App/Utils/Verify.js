export const verifyEmail = (email) => {
  const reg = /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/;
  return reg.test(email);
};

