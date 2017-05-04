export function h(tag: string = 'div', props: {} = {}, children: any = []) {
	return {
		tag,
		props,
		children
	};
}

export function render(element: null): null;
export function render(element: undefined): undefined;
export function render(element: string): Node;
export function render(element: number): Node;
export function render(element: {}): Node;
export function render(element: Node): Node;
export function render(element: Node[]): Node[];
export function render(element: any): any {
	if (typeof element === 'string' || typeof element === 'number') {
		return document.createTextNode(String(element));
	}

	if (!element || isNode(element)) {
		return element;
	}

	if (Array.isArray(element)) {
		return element.map(render);
	}

	if (typeof element.tag !== 'string') {
		return null;
	}

	const {tag, props} = element;
	const el = document.createElement(tag);
	Object.assign(el, props);
	const children = wrapInArray(render(element.children));

	children.filter(node => {
		if (!isNode(node)) {
			console.log('weird child node in', tag, '\n', node, children);
			return false;
		}

		return true;
	}).forEach(childEl => el.appendChild(childEl));

	return el;
}

function isNode(element: any): element is Node {
	return element && element instanceof Node;
}

function wrapInArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}


