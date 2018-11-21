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
    'tv-chuck': 'Chuck',
    'Ext-03336565_FC9F60AC-13AD-47A3-BC82-A1F73479D476': 'Kuba',
    'Ext-03336565_8DCD8FDE-C843-4133-B425-32BD5BC41A0B': 'Artur',
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
