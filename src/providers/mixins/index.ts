export const getHistoryLocalStorage = (): string[] => {
  const history = localStorage.getItem("history") ?? "";
  const searchList = history ? JSON.parse(history) : [];

  return searchList;
};
