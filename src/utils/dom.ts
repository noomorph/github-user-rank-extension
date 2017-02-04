export function get_meta_content(name: string) {
	const meta = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
	return meta && meta.content || '';
}
