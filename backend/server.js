const express = require('express');
const app = express();
const cors = require('cors')
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes');
const User = require('./models/User');
// Initialize sequelize and sync models with the database
const signup = async ()=>{
  try {
    const existingUser = await User.findOne({ where: { username: 'admin' } });
    if (existingUser) {
      console.log('Username is already taken')
      return
    }
    const defaultUser = await User.create({ username: 'admin', password: 'admin' });
   console.log(defaultUser)
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    await sequelize.sync();
    console.log('Database sync successful');
    await signup()
  } catch (error) {
    console.error('Database connection failed:');
  }
})();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', listRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
