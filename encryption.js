// bcrypt-password-hash.js
import bcrypt from 'bcrypt';

// Change this to your password:
const password = 'Drhabtamu123';

(async () => {
  try {
    const saltRounds = 10; // Default used by most apps
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('✅ Your hashed password is:\n', hash);
  } catch (err) {
    console.error('❌ Error hashing password:', err.message);
  }
})();
