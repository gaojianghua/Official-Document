export const getSession = (key: string) => {
    if (!key) {
        return
    }
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    return isBrowser ? window['localStorage'][key] : '';
};
export const setSession = (key: string, value: any) => {
    if (!key) {
        return
    }
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        window['localStorage'].setItem(key, JSON.stringify(value))
    }
};
export const removeSession = (key: string) => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        window['localStorage'].removeItem(key)
    }
};