const Vois = require('./js/Vois')

window.Vois = Vois;

let app = Vois.of({
    tpl: `
        <div class="app" :style="sty">
            test
            <h1>hello, world</h1>
            <p @click="sayHello"> name {{ name }} {{ sty }}</p>
        </div>
    `, 
    sty: 'color: red;', 
    name: 'eczn', 
    sayHello(){
        console.log('hello, my name is', this.name);
    }
}); 

window.app = app;  

app.$mount(
    document.getElementById('app')
); 
