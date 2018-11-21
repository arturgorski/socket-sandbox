const randomUsers = [
    'Artur',
    'Marcin',
    'Jadwiga',
    'Jakub',
    'Gabrysia',
    'Adrian',
    'Jarosław',
    'Zenon',
    'Ryszard',
    'Ryszarda',
    'Tomasz'
];

const definedUsers = {
    'tv-waldek': 'Waldek',
    'tv-chuck': 'Chuck',
    'Ext-08853624': 'Kuba',
    'd': 'John',
};

let index = 0;

const getUserName = (userId) => {
    const username = definedUsers[userId];

    if (!username) {
        if (index > randomUsers.length - 1) {
            index = 0;
        }

        return randomUsers[index++];
    }

    return username;
};

module.exports = {
    getUserName,
};
