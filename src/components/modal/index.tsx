import Modal from './Modal';
import { alert, close } from './alert';
import prompt from './prompt';
import operation from './operation';

(Modal as any).alert = alert;
(Modal as any).closeAlert = close;
(Modal as any).operation = operation;
(Modal as any).prompt = prompt;

export default Modal;
