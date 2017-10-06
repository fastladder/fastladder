import API from '../../ldr/api';

export default function getFolders(calllback) {
    const api = new API('/api/folders');
    api.post({}, (json) => {
        const folder = json;
        folder.id2name = {};
        Object.keys(folder.name2id).forEach((key) => {
            folder.id2name[folder.name2id[key]] = key;
        });
        callback(folder);
    });
}
