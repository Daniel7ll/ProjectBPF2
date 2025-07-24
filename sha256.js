import bcrypt from 'bcrypt';

const password = '123';
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);
console.log('Hash bcrypt:', hash);
