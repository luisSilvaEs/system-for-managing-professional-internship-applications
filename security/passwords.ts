import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id, // Ensure you're using the same type (argon2id in this case)
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    console.log(`Plain password: ${plainPassword}`);
    console.log(`Hashed password: ${ hashedPassword}`);
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    throw new Error('Error verifying password');
  }
}
