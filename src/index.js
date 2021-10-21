import WebGLRenderingContext from 'webgl-mock-threejs/src/WebGLRenderingContext.js';

WebGLRenderingContext.prototype['getSupportedExtensions'] = function () {
    return [];
};

import HTMLCanvasElement from 'webgl-mock-threejs/src/HTMLCanvasElement.js';

HTMLCanvasElement.prototype['removeEventListener'] = function() { };

import { Application, createScript, Entity } from 'playcanvas';

const scriptsApp = new Application(new HTMLCanvasElement());

var Test = createScript('test', scriptsApp);

Test.attributes.add('applicationIndex', { type: 'string' });

Test.prototype.update = function (dt) {
    console.log(`${dt}: ${this.applicationIndex}`);
};

const app1 = new Application(new HTMLCanvasElement());
app1.scripts = scriptsApp.scripts;
app1.autoRender = false;

const test1 = new Entity('test1');
test1.addComponent('script');
test1.script.create('test', {
    attributes: {
        applicationIndex: 'application 1',
    }
});
app1.root.addChild(test1);

app1.start();

const app2 = new Application(new HTMLCanvasElement());
app2.scripts = scriptsApp.scripts;
app2.autoRender = false;

const test2 = new Entity('test2');
test2.addComponent('script');
test2.script.create('test', {
    attributes: {
        applicationIndex: 'application 2',
    }
});
app2.root.addChild(test2);

app2.start();

app1.update(111);
app1.update(222);

// expected output
// 111: application 1
// 222: application 1

app2.destroy();

app1.update(333);

// expected output
// 333: application 1

app1.destroy();

// expected result
// app is destroyed
