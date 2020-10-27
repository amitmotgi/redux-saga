/*
* passwordCheck
* */
export const signUpPasswordCheck = value => {
  const passwordLength = 8;
  const leastOneNumber = /\d/;
  const leastSpecialSymbols =
    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
  const hasEnoughLength = value.length >= passwordLength;
  const hasOneNumber = leastOneNumber.test(value);
  const hasSpecialSymbols = leastSpecialSymbols.test(value);
  const matchAllCondition = hasEnoughLength && hasOneNumber && hasSpecialSymbols;

  return {
    hasEnoughLength,
    hasOneNumber,
    hasSpecialSymbols,
    matchAllCondition
  };
};
