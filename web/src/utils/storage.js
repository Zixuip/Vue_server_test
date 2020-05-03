export const setStore = (name, userId, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, userId, content)
}

export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name)
}

export const removeStore = (name, userId) => {
  if (!name) return;
  window.localStorage.removeItem(name, userId)
}