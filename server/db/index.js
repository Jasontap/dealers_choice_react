const db = require('./db');
const List = require('./list');
const Reminder = require('./reminder');

Reminder.belongsTo(List);
List.hasMany(Reminder);

const syncAndSeed = async() => {
  await db.sync({ force: true });
  // await Promise.all([
    //Reminder Lists
    const list1 = await List.create({ name: 'List 1' });
    const list2 = await List.create({ name: 'List 2' });
    const list3 = await List.create({ name: 'List 3' });

    //Reminders for list 1
    Reminder.create({ 
      name: 'List 1 Reminder 1',
      listId: 1
    });
    Reminder.create({ 
      name: 'List 1 Reminder 2',
      listId: 1
    });
    Reminder.create({ 
      name: 'List 1 Reminder 3',
      listId: 1
    });
    Reminder.create({ 
      name: 'List 1 Reminder 4',
      listId: 1,
      completed: true
    });
    Reminder.create({ 
      name: 'List 1 Reminder 5',
      listId: 1,
      completed: true
    });

    //Reminders for list 2
    Reminder.create({ 
      name: 'List 2 Reminder 1',
      listId: 2
    });
    Reminder.create({ 
      name: 'List 2 Reminder 2',
      listId: 2
    });
    Reminder.create({ 
      name: 'List 2 Reminder 3',
      listId: 2,
      completed: true
    });
    
     //Reminders for list 3
    Reminder.create({ 
      name: 'List 3 Reminder 1',
      listId: 3
    });
    Reminder.create({ 
      name: 'List 3 Reminder 2',
      listId: 3,
      completed: true
    });
    Reminder.create({ 
      name: 'List 3 Reminder 3',
      listId: 3
    });
    Reminder.create({ 
      name: 'List 3 Reminder 4',
      listId: 3
    });
    Reminder.create({ 
      name: 'List 3 Reminder 5',
      listId: 3,
      completed: true
    });
}

module.exports = {
  syncAndSeed
}