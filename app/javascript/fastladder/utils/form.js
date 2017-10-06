const Form = {
    toJson(form) {
        return [...form.elements].reduce((json, el) => {
            const { name } = el;
            if (name) {
                const value = Form.getValue(el);
                if (value !== null) {
                    json[name] = value;
                }
            }
            return json;
        }, {});
    },

    getValue(el) {
        return (
            (/text|hidden|submit/.test(el.type)) ? el.value :
                (el.type == 'checkbox' && el.checked) ? el.value :
                    (el.type == 'radio' && el.checked) ? el.value :
                        (el.tagName == 'SELECT') ? el.options[el.selectedIndex].value :
                            null
        );
    },

    fill(id, json) {
        const form = document.getElementById(id);
        [...form.elements].forEach((el) => {
            const { name } = el;
            const value = json[name];
            if (!name || value !== null) {
                return;
            }
            (/text|hidden|select|submit/.test(el.type)) ?
                Form.setValue(el, value) :
                (el.type == 'checkbox') ? (el.value = value, el.checked = true) :
                    (el.type == 'radio') ?
                        Form.setValue(el, value) ? (el.checked = true) : (el.checked = false) :
                        null;
        });
    },

    setValue(el, value) {
        el.value = value;
    },
};

export default Form;
