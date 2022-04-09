require('dotenv').config()
global.__logger = require('./config/logger');
const mongoose = require('./config/database/mongoose/config/mongoose.config');
const Auth = require('./config/database/mongoose/models/Auth');

const init = async () => {
  await Auth.deleteMany()
  const user = new Auth({
    email: 'test@test.com',
    password: 'test'
  })
  await user.save()
  const comparePassword1 = await user.comparePassword('some other password')
  const comparePassword2 = await user.comparePassword('test')
  console.log({
    comparePassword1,
    comparePassword2
  })
}

mongoose.connect(process.env.MONGODB_URL).then(init)
