import { atom } from 'recoil';

export const debugState = atom({
    key: 'debugState',
    default: Number(localStorage['count'] ?? '0'),
    effects: [
        ({onSet}) => {
            onSet(v => {
                localStorage['count'] = v;
            });
        }
    ],
});