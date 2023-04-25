export const DBConfig = {
  name: "vtxcloud",
  version: 1,
  objectStoresMeta: [
    {
      store: "auth",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [{}]
    }
  ]
};
