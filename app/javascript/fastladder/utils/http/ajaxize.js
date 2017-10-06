import isFunction from 'lodash/isFunction';
import API from '../../ldr/api';
import Form from '../form';

// formをAjax化する
export default function ajaxize(id, callback) {
    const element = document.getElementById(id);
    const method = element.method;
    const action = element.getAttribute('action');
    let before,
        after;
    // ひとつの場合は完了時処理
    if (isFunction(callback)) {
        before = () => true;
        after = callback;
    } else {
        before = callback.before || (() => true);
        after = callback.after || (() => {});
    }
    const onSubmit = (e) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const request = Form.toJson(element);
        if (before(request)) {
            const api = new API(action);
            api.onload = response => after(response, request);
            api.post(request);
        }
    };
    element.onsubmit = onSubmit;
    element.submit = onSubmit;
}
