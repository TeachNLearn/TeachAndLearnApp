/* eslint-disable prettier/prettier */
import Toast from 'react-native-toast-message';

export class ToastHOC {
    static errorAlert(text1: string, text2: string) {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: text1,
            text2: text2,
            autoHide: true,
            visibilityTime: 1500,
        });
    }

    static successAlert(text1: string, text2: string) {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: text1 || 'Success',
            text2: text2,
            autoHide: true,
        });
    }

    static infoAlert(text1: string, text2: string) {
        Toast.show({
            type: 'info',
            position: 'top',
            text1: text1 || 'Info',
            text2: text2,
            autoHide: true,
        });
    }
}
