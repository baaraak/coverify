'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var removeKeys = (blackList) => (obj) => {
    const cleanObj = obj;
    blackList.forEach((item) => Object.prototype.hasOwnProperty.call(cleanObj, item) &&
        delete cleanObj[item]);
    return cleanObj;
};

var key = () => Math.random()
    .toString(36)
    .substring(2);

const blackListProps = ['rowGap', 'columnWidth', 'uniqueid'];
const removeBlackListed = removeKeys(blackListProps);
class Snuggle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gridId = null;
        this.reposition = false;
        this.elements = [];
        this.grid = null;
        this.getRef = (ref) => {
            if (ref && ref.firstElementChild) {
                this.elements.push(ref);
            }
        };
        this.setValues = () => {
            const { rowGap = 0 } = this.props;
            if (this.elements.length === 0) {
                return null;
            }
            this.elements.forEach((item) => {
                const itemRef = item;
                if (itemRef && itemRef.firstElementChild) {
                    const firstElement = itemRef.firstElementChild;
                    const itemHeight = firstElement.getBoundingClientRect().height;
                    const rowSpan = Math.ceil((itemHeight + rowGap) / rowGap);
                    itemRef.style.gridRowEnd = `span ${rowSpan}`;
                }
                return null;
            });
            if (!this.reposition) {
                window.requestAnimationFrame(this.setValues);
                this.reposition = true;
            }
        };
        this.onLoadImages = () => {
            if (this.grid) {
                const images = this.grid.getElementsByTagName('img');
                Array.from(images).forEach((img) => {
                    const imageRef = img;
                    imageRef.onload = () => {
                        this.setValues();
                    };
                });
            }
        };
        this.createGridStyle = () => {
            const { rowGap = 0, columnWidth = 0 } = this.props;
            return `
      <style>
        .${this.gridId} {
          display: grid;
          grid-gap: ${rowGap}px;
          grid-template-columns: repeat(auto-fill, minmax(${columnWidth}px, 1fr));
        }
      </style>`;
        };
        this.gridId = `snuggle--${props.uniqueid || key()}`;
        props.innerRef.current = { resize: this.setValues };
    }
    componentDidMount() {
        this.setValues();
        this.onLoadImages();
    }
    componentDidUpdate() {
        this.setValues();
    }
    render() {
        const _a = this.props, { children, item = React.createElement('div'), container = React.createElement('div'), innerRef } = _a, compProps = __rest(_a, ["children", "item", "container", "innerRef"]);
        const hasChildren = React.Children.count(children) > 0;
        if (!hasChildren) {
            return null;
        }
        const refItem = (n) => {
            this.getRef(n);
        };
        const refGrid = (n) => {
            this.grid = n;
        };
        const renderChildren = React.Children.map(children, (child) => {
            const itemProps = removeBlackListed(Object.assign({}, item.props, { key: key(), ref: refItem }));
            if (item) {
                return React.createElement(item.type, itemProps, child);
            }
            return null;
        });
        const containerProps = removeBlackListed(Object.assign({}, container.props, compProps, { className: `${this.gridId} ${container.props.className || ''}`, ref: refGrid }));
        return (React.createElement(React.Fragment, null,
            React.createElement('div', {
                dangerouslySetInnerHTML: { __html: this.createGridStyle() },
            }),
            React.createElement(container.type, containerProps, renderChildren)));
    }
}
Snuggle.defaultProps = {
    columnWidth: 250,
    container: React.createElement('div'),
    item: React.createElement('div'),
    rowGap: 20,
    uniqueid: '',
};
var index = React.forwardRef((props, ref) => (React.createElement(Snuggle, Object.assign({ innerRef: ref }, props))));

exports.default = index;
