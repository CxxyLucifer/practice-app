/**
 * Created by liuhui on 2017/7/25.
 */
import Home from './home';

//common
import Form from './common/form'
import MaskModal from './common/maskModal'
//third
import QRCode from './thirdPart/qrcode'
import QRScanner from './thirdPart/qrscanner'


const routes = {
    Home: { screen: Home },
    //common
    Form: { screen: Form },
    MaskModal: {screen: MaskModal},
    //third
    QRCode: { screen: QRCode },
    QRScanner: { screen: QRScanner }
};

export default routes;
