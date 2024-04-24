const setLocalStorageKeyPrefix = (key: string) => {
  const prefix = "mern-chat-client";
  return prefix + "-" + key;
};

const chatConstants = {
  LOCAL_STORAGE_KEY: {
    accessKey: setLocalStorageKeyPrefix("access-token"),
    refreshKey: setLocalStorageKeyPrefix("refresh-token"),
    user: setLocalStorageKeyPrefix("user"),
    api: setLocalStorageKeyPrefix("api"),
    activeUser: setLocalStorageKeyPrefix("active-user"),
    socket: setLocalStorageKeyPrefix("socket"),
  },
};

export default chatConstants;
