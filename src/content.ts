import {router} from './routes/index';
document.addEventListener('DOMContentLoaded', router);
document.addEventListener('pjax:end', router);
