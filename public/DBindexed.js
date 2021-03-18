let db;

const request = indexedDB.open("budgetDB", 1);

const database = (function () {
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log(db);
    const objectStore = db.createObjectStore("movements", { keyPath: "id" });
    objectStore.createIndex("Add founds");
    objectStore.createIndex("Remove Founds");
  };

  request.onerror = (event) => {
    console.log(`Error`);
  };

  request.onupgradeneeded = (event) => {};

  const saveRecord = function (ev, transaction) {
    ev.preventDefault();

    let id = Math.floor(Math.random() * 1000);

    let tx = db.transaction("movements", "readwrite");
    tx.oncomplete = (ev) => {
      console.log("complete");
    };
    tx.onerror = (ev) => {
      console.log("error transaction");
    };

    let store = tx.objectStore("movements");
    let request = store.add(transaction);
  };

  document.querySelector("#add-btn").addEventListener("click", saveRecord);
})();
