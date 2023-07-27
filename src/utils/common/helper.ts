function get(obj: any, key: string) {
    return key in obj ? obj[key] : null;
}

export {get};