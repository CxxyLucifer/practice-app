import { Toast } from 'antd-mobile';

const solveMessage = (error) => {
    let Obj: any = Object;

    for (let { errors } of Obj.values(error)) {
        for (let { field, message } of errors) {
            Toast.info(message, 2, () => { }, false);
            break;
        }
        break;
    }
}

export default {
    solveMessage
}