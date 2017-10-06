import partition from 'lodash/partition';
import TreeItem from '../../ui/tree_item';
import TreeView from '../../ui/tree_view';
import SubscribeTemplate from './subscribe_template';

export default class SubscribeFormatter {
    static item(v) {
        return new TreeItem(v);
    }

    static flat(model) {
        return model.getList().map(SubscribeFormatter.item).join('');
    }

    static folder(model) {
        const folderNames = model.getFolderNames();
        const folders = folderNames.map((v) => {
            const filtered = model.getByFolder(v);
            const param = {
                name: v,
                unread_count: filtered.getUnreadCount(),
            };
            const folder = new TreeView(
                SubscribeTemplate.folder.fill(param),
                () => SubscribeFormatter.flat(filtered),
            );
            folder.param = param;
            return folder;
        });
        const [root, folder] = partition(folders, v => v.param.name === '');
        if (root[0]) {
            root[0].open();
        }
        const df = document.createDocumentFragment();
        root.forEach(item => df.appendChild(item.child));
        folder.forEach(item => df.appendChild(item.element));
        return df;
    }

    static rate(model) {
        const rateNames = model.getRateNames();
        const rates = rateNames.map((v) => {
        });
        // wip...
    }

    static subscribers(model) {
        // wip...
    }

    static domain(model) {
        // wip...
    }
}
