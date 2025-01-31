// models/index.js
import User from './User.js';
import Task from './Task.js';

/* relacionamentos */
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export { User, Task };
