import { withoutNulls } from './utils/arrays';

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
}

export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    }
}


function mapTextNodes(children) {
    return children.map( (child) => {
        typeof child === 'string' ? hString(child) : child;
    })
}

export function hString(str) {
    return {
        type: DOM_TYPES.TEXT,
        value: str,
    }
}

export function hFragment(children) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(children)),
    }
}

h('form', { class: 'login-form', action: 'login' }, [
    h('input', {type: 'text', name: 'user'}),
    h('input', {type: 'password', name: 'pass'}),
    h('button', {on: {click:login}}, ['Log in'])
])

hFragment([
    h('h1', {class: 'title'}, ['My counter']),
    h('div', {class:'container'} ,[
        h('button', {}, ['decrement']),
        h('span', {}, ['0']),
        h('button', {}, ['increment'])
    ])
])

export function lipsum(num){

    let children = [];
    for (leti = 0; i < num; i++){
        children.push(h('p', {}, ['Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co modo consequat.']))
    }

    return hFragment(children)
}

export function messageComponent(level, message){
    return h('div', {class: `message message--${level}`},[
        h('p', {}, [message])
    ])
}