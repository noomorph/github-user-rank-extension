import router from './routes/index';

export default function main(document: Document) {
    document.addEventListener('DOMContentLoaded', router.listen);
    document.addEventListener('pjax:end', router.listen);
}

if (typeof document !== "undefined") {
    main(document);
}
