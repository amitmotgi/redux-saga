import { signUpPasswordCheck } from '../../App/Utils/PasswordCheck'

describe('PasswordCheck SignUP', () => {
  it('hasEnoughLength hasOneNumber hasSpecialSymbols matchAllCondition', () => {
    const {
      hasEnoughLength,
      hasOneNumber,
      hasSpecialSymbols,
      matchAllCondition
    } = signUpPasswordCheck('sdf888$s')
    expect(hasEnoughLength).toBe(true)
    expect(hasOneNumber).toBe(true)
    expect(hasSpecialSymbols).toBe(true)
    expect(matchAllCondition).toBe(true)
  })
})
