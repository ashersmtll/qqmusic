import ajax from './ajax.js';

export const getHotKey = () => ajax('/api/getHotKey');

export const getSearchLists = key => ajax('/api/getSearch', {key});

export const getSongInfo = id => ajax('/api/getCdInfo', {id})