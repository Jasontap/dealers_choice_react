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
      name: 'Reminder 1',
      listId: 1
    });
    Reminder.create({ 
      name: 'Reminder 2',
      listId: 1
    });
    Reminder.create({ 
      name: 'Reminder 3',
      listId: 1
    });

    //Reminders for list 2
    Reminder.create({ 
      name: 'Reminder 1',
      listId: 2
    });
    Reminder.create({ 
      name: 'Reminder 2',
      listId: 2
    });
    Reminder.create({ 
      name: 'Reminder 3',
      listId: 2
    });
    
     //Reminders for list 3
    Reminder.create({ 
      name: 'Reminder 1',
      listId: 3
    });
    Reminder.create({ 
      name: 'Reminder 2',
      listId: 3
    });
    Reminder.create({ 
      name: 'Reminder 3',
      listId: 3
    });
  // ])
}

module.exports = {
  syncAndSeed
}