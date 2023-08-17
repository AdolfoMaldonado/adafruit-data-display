import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  constructor() {}

  getDataFromIndexedDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('token', 1);

      request.onerror = (event: Event) => {
        reject('Error al abrir la base de datos');
      };

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction('db_token', 'readonly');
        const objectStore = transaction.objectStore('db_token');

        const getRequest = objectStore.get(1);

        getRequest.onsuccess = (event) => {
          const data = (event.target as IDBOpenDBRequest)?.result;
          resolve(data);
        };

        getRequest.onerror = (event) => {
          reject('Error al obtener los datos de IndexedDB');
        };
      };
    });
  }
}
