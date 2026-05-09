import { DatabaseSync } from 'node:sqlite';

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
        flags BLOB
    ) STRICT
    `);

    // cart
    database.exec(`
    CREATE TABLE IF NOT EXISTS cart(
        id INTEGER PRIMARY KEY,
        products BLOB
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
    const insert = database.prepare('INSERT INTO products (name, desc, longdesc, price, purchasable, flags) VALUES (?, ?)');

    insert.run(name, desc, longdesc, price, purchasable, flags);
}