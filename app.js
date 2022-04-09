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
  const comparePassword = user.comparePassword('test')
  await user.hashField('email')
  const data = await Auth.find()
}

mongoose.connect(process.env.MONGODB_URL).then(init)
