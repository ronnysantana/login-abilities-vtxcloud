/* export const validatePassword = (dig = 4) => {
  return new RegExp(`^([0-9]{${dig}})$`);
}; */

export const validatePassword = new RegExp(`^([0-9]{4})$`);
