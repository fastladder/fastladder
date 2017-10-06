import addClass from '../../utils/css/add_class';
import removeClass from '../../utils/css/remove_class';
import setStyle from '../../utils/css/set_style';

export default class ListItem {
    constructor() {}

    onhover = ({ target: el }) => {
        setStyle(el, this.focusStyle);
        addClass(el, this.focusClass);
    }

    onunhover = ({ target: el }) => {
        setStyle(el, this.normalStyle);
        removeClass(el, this.focusClass);
    }
}
