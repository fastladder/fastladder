import Application from '../../ldr/application';
import touchAll from './touch_all';

const app = Application.getInstance();

export default function touch(id, state) {
    if (app.config.touch_when === state) {
        touchAll(id);
    }
}
