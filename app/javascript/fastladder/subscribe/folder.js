import API from '../ldr/api';

export default class Folder {
    static create(name, callback) {
        const api = new API('/api/folder/create');
        api.post({ name }, res => callback);
    }
}
