export const useAuthUuid = defineStore('authStore', {
  state: () => ({
    uuid: ''
  }),
  actions: {
    getOrSetAuth() {
      const KEY = 'bingo_auth_uuid';
      const localStore = localStorage.getItem(KEY);
      const uuid = localStore ?? crypto.randomUUID();
      if (!localStore) {
        localStorage.setItem(KEY, uuid);
      }

      this.uuid = uuid;

      return uuid;
    }
  }
});
