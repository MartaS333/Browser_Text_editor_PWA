import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);

  // Readwrite because the information is changing
  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  // Sets the id to 1 and the value to the new content
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Creates the connection to the database and version to be used
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and tells it the privileges
  const tx = jateDb.transaction("jate", "readonly");

  // Opens the desired object store
  const store = tx.objectStore("jate");

  // Gets the request from put
  const request = store.get(1);

  // Confirmation of request
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
