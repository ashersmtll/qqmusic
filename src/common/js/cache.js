
export const getSession = (k) => {
	let v = global.sessionStorage.getItem(k);
	return !!v? JSON.parse(v).value: '';
};

export const setSession = (k, v) => global.sessionStorage.setItem(k, JSON.stringify({value: v}));

export const rmSession = (k) => global.sessionStorage.removeItem(k);

export const clSession = () => global.sessionStorage.clear();
