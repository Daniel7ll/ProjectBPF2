// bcrypt.js (ESM version)
import bcrypt from 'bcrypt';

const text = '123';
const saltRounds = 10;

const hash = await bcrypt.hash(text, saltRounds);
console.log('Hash bcrypt:', hash);
