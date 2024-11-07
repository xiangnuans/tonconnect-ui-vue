import { getCurrentInstance, isVue2 } from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';

export function useTonConnectUI() {
    if (isServerSide()) {
        return {
            tonConnectUI: null as TonConnectUI | null,
            setOptions: () => {},
        };
    }

    const instance = getCurrentInstance() as  any;
    const globalPropertiesMap = isVue2 ? instance?.proxy: instance?.appContext?.app.config.globalProperties

    const tonConnectUI = globalPropertiesMap?.$tonConnectUI as TonConnectUI | undefined;

    if (!tonConnectUI) {
        return {
            tonConnectUI: null,
            setOptions: () => console.warn("TonConnect is not available"),
            error: new Error("TonConnect is not available"),
        };
    }

    checkProvider(tonConnectUI);

    const setOptions = (options: TonConnectUiOptions) => {
        tonConnectUI.uiOptions = options;
    };


    return {
        tonConnectUI,
        setOptions,
    };
}
