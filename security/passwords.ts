import argon2 from 'argon2';

export async function hashPassword(plainPassword: string) {
  try {
    const hashedPassword = await argon2.hash(plainPassword);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  try {
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    throw new Error('Error verifying password');
  }
}
