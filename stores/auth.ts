export const useAuthUuid = defineStore('authStore', () => {
  const KEY = 'bingo_auth_uuid';
  const uuidRef = ref<string>('');
  const cookieRef = useCookie(KEY);

  const getOrSetAuth = () => {
    const localStore = localStorage.getItem(KEY);
    const uuid = localStore ?? crypto.randomUUID();
    if (!localStore) {
      localStorage.setItem(KEY, uuid);
    }
    if (!cookieRef.value) {
      cookieRef.value = uuid;
    }
    uuidRef.value = uuid;
    return uuid;
  };

  return {
    getOrSetAuth,
    uuid: uuidRef,
    cookie: cookieRef
  };
});
