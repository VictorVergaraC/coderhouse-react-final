export const getLsItem = (key) => JSON.parse(localStorage.getItem(key)) || null

export const setLsItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))