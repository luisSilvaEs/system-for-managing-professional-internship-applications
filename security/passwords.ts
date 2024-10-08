export async function hashPassword(plainPassword: string) {
  try {
    const argon2 = await import('argon2');
    const hashedPassword = await argon2.hash(plainPassword);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  try {
    const argon2 = await import('argon2');
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    throw new Error('Error verifying password');
  }
}
