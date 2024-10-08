import { pbkdf2Sync, randomBytes } from 'crypto';

const SALT_LENGTH = 16; // Length of the salt in bytes
const HASH_ITERATIONS = 1000; // Number of iterations
const HASH_LENGTH = 64; // Length of the derived key (hash) in bytes
const DIGEST_ALGORITHM = 'sha512'; // Hashing algorithm

// Hash a password using PBKDF2
export function hashPassword(plainPassword: string): string {
  const salt = randomBytes(SALT_LENGTH).toString('hex');
  const hashedPassword = pbkdf2Sync(plainPassword, salt, HASH_ITERATIONS, HASH_LENGTH, DIGEST_ALGORITHM).toString('hex');
  return `${salt}:${hashedPassword}`; // Return salt and hashed password
}

// Verify a password against a stored hashed password
export function verifyPassword(plainPassword: string, hashedPassword: string): boolean {
  const [salt, storedHash] = hashedPassword.split(':');
  const hashedAttempt = pbkdf2Sync(plainPassword, salt, HASH_ITERATIONS, HASH_LENGTH, DIGEST_ALGORITHM).toString('hex');
  return storedHash === hashedAttempt; // Compare stored hash and hash attempt
}
