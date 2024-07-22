const Datastore = require('@seald-io/nedb');

export const db = new Datastore({ filename: 'products' });

export const initDatastore = async () => {
  try {
    await db.loadDatabaseAsync();
  } catch (e) {
    console.log(e);
  }
};
