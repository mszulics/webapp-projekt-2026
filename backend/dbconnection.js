import { DatabaseSync } from 'node:sqlite';
import { createHmac } from 'node:crypto';
import e from 'express';

const database = new DatabaseSync('webappdb.sqlite');

function ensureExists() {
    // products
    database.exec(`
    CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY,
        name TEXT,
        desc TEXT,
        longdesc TEXT,
        price INTEGER,
        purchasable INTEGER,
        flags TEXT
    ) STRICT
    `);

    // cart
    database.exec(`
    CREATE TABLE IF NOT EXISTS cart(
        id INTEGER PRIMARY KEY,
        products TEXT
    ) STRICT
    `);

    // user
    database.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        name TEXT,
        mail TEXT,
        psw TEXT,
        cartid INTEGER
    ) STRICT
    `);
}

export function getAllProducts() {
    ensureExists();
    const query = database.prepare('SELECT * FROM products ORDER BY name');
    return query.all();
}

export function addProduct(name, desc, longdesc, price, purchasable = 1, flags = []) {
    ensureExists();
    const insert = database.prepare('INSERT INTO products (name, desc, longdesc, price, purchasable, flags) VALUES (?, ?, ?, ?, ?, ?)');
    insert.run(name, desc, longdesc, price, purchasable, JSON.stringify(flags));
}

export function hasProductName(name) {
    ensureExists();
    const insert = database.prepare('SELECT id FROM products WHERE products.name == ? ');
    return insert.get(name) != undefined;
}

function hashPsw(psw) {
    // salting and hashing password
    const hmac = createHmac('sha256', 'MyFancySecret');
    hmac.update(psw + "SALTHERE++++!+3463564527 bgrtzh56u");
    return hmac.digest('hex');
}

export function registerUser(name, mail, psw) {
    ensureExists();
    // check for user login, some people used to register and login more times (mahaps frogot to registered?)
    if (loginUser(mail, psw))
    {
        // code 1 means user already registered, log the user in!
        return 1;
    }
    // user already has mail in the db.
    else if (hasUser(mail))
    {
        // code 2 means user already registered but the psw is different!
        return 2;
    }

    psw = hashPsw(psw);
    const insert = database.prepare('INSERT INTO users (name, mail, psw, cartid) VALUES (?, ?, ?, 0)');
    insert.run(name, mail, psw);
    return 0; // 0 as a "ok" resposnse
}

// returns true or false if user is exists.
export function loginUser(mail, psw) {
    psw = hashPsw(psw);
    ensureExists();
    const insert = database.prepare('SELECT id FROM users WHERE users.mail == ? AND users.psw == ?');
    return insert.get(mail, psw) != undefined;
}

function hasUser(mail) {
    ensureExists();
    const select = database.prepare('SELECT id FROM users WHERE users.mail == ?');
    return select.get(mail) != undefined;
}

export function deleteUser(mail) {
    ensureExists();
    const del = database.prepare('DELETE FROM users WHERE users.mail == ?');
    del.run(mail);
}

export function mergeCart(mail, cartId) {
    ensureExists();
    const update = database.prepare('UPDATE users SET users.cartid = ? WHERE users.mail == ?');
    update.run(cartId, mail);
}