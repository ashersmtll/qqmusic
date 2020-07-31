import ajax from "./ajax";

export const getLyc = (id) => ajax('/api/getLic', {id}, 'GET', !1);