import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
import React from 'react';
import SearchBox from '../SearchBox';
import sd from 'skin-deep';

expect.extend(expectJSX);

describe('SearchBox', () => {
	let tree, instance, vdom, spy;

	function render(el) {
		tree = sd.shallowRender(el);
		instance = tree.getMountedInstance();
		vdom = tree.getRenderOutput();
	}

	beforeEach(() => {
		render(<SearchBox />);
		spy = expect.createSpy(() => null);
	});

	it('renders a text input', () => {
		expect(vdom.type).toEqual('input');
		expect(vdom.props.type).toEqual('text');
	});

	it('renders the value', () => {
		const expected = 'General Hux';
		render(<SearchBox value={expected} />);
		expect(vdom.props.value).toEqual(expected);
	});

	it('triggers the onSearch callback', () => {
		render(<SearchBox onSearch={spy} />);
		tree.props.onChange({target: {value: 'Star Wars'}});
		expect(spy).toHaveBeenCalledWith('Star Wars');
	});

	it('has a noop onSearch callback by default', () => {
		expect(instance.props.onSearch()).toEqual(null);
	});

	it('triggers the onClear callback', () => {
		render(<SearchBox onClear={spy} value="Star Wars" />);
		tree.props.onChange({target: {value: ''}});
		expect(spy).toHaveBeenCalled();
	});

	it('has a noop onClear callback by default', () => {
		expect(instance.props.onClear()).toEqual(null);
	});

	it('affects the input\'s fontSize by windowWidth', () => {
		expect(tree.props.style.fontSize).toEqual('3rem');
		tree.reRender(<SearchBox windowWidth={300} />);
		expect(tree.props.style.fontSize).toEqual('1.5rem');
	});

	afterEach(() => {
		spy.restore();
		expect.restoreSpies();
	});
});
