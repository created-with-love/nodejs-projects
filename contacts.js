const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '/db/contacts.json');
// const contactsPath = path.resolve('/db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(JSON.parse(data));
    return JSON.parse(data);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const contact = JSON.parse(data).filter(({ id }) => id === contactId);
    console.log(contact[0]);
    return contact[0];
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const parsedData = JSON.parse(data);
    const newData = parsedData.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log(`Contact with id: ${contactId} was deleted`);
  });
}

function addContact(name, email, phone) {
  const newObj = {
    name,
    email,
    phone,
    id: shortid.generate(),
  };

  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const parsedData = JSON.parse(data);
    const newData = [...parsedData, newObj];

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log('New contact has been added');
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
