"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var head_1 = require("next/head");
var antd_1 = require("antd");
var index_module_scss_1 = require("./index.module.scss");
var router_1 = require("next/router");
var MainBox = function (_a) {
    var children = _a.children;
    var pathname = router_1.useRouter().pathname;
    var baiduSearch = function () {
    };
    return (React.createElement("div", { className: index_module_scss_1["default"].container },
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Wolffy\u5370\u8BB0"),
            React.createElement("meta", { "data-n-head": "ssr", name: "description", content: "next app vue react uniapp taro" }),
            React.createElement("meta", { "data-n-head": "ssr", name: "description", content: "\u5B98\u7F51\u5370\u8BB0 \u7070\u592A\u72FC" }),
            React.createElement("link", { rel: "icon", href: "/Wolffy.ico" })),
        pathname === '/' ? (React.createElement("div", { className: clsx_1["default"](index_module_scss_1["default"].search) },
            React.createElement(antd_1.Form, { name: "search", initialValues: { remember: true }, autoComplete: "off" },
                React.createElement(antd_1.Form.Item, { className: clsx_1["default"](index_module_scss_1["default"].formItem, 'w100'), name: "code" },
                    React.createElement(antd_1.Input.Group, { className: clsx_1["default"](index_module_scss_1["default"].group, 'dflex'), compact: true },
                        React.createElement(antd_1.Input, { className: clsx_1["default"](index_module_scss_1["default"].input, 'w100') }),
                        React.createElement(antd_1.Button, { type: "primary", className: clsx_1["default"](index_module_scss_1["default"].btn), onClick: baiduSearch }, "\u767E\u5EA6\u4E00\u4E0B")))))) : React.createElement(React.Fragment, null),
        React.createElement("div", { className: clsx_1["default"](index_module_scss_1["default"].content, pathname == '/' ? 'home' : 'other') },
            React.createElement("div", { className: clsx_1["default"](index_module_scss_1["default"].list, 'dflex', 'flexwrap', 'overscr') }, children))));
};
