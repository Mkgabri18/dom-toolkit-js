import DOMToolkit from './src/index.js';
const { Selectors, local, session } = DOMToolkit;

const { selectId, inHtml } = new Selectors()

// onEvent($button, 'click', changecolor);
selectId('addColor').onClick(addChangecolor);
selectId('toggleColor').onClick(toggleChangecolor);
selectId('removeColor').onClick(removeChangecolor);
selectId('replacecolor').onClick(replacecolor);

selectId('insertT')
    .inHtml('Hello World!')
    .addClass('color-red')

function addChangecolor() {
    selectId('description').addClass('color-red font-xl');
}

function toggleChangecolor() {
    selectId('description').toggleClass('color-red');
}

function removeChangecolor() {
    selectId('description').removeClass('color-red font-xl');
}

function replacecolor() {
    selectId('description').replaceClass('color-red', 'color-blue');
}

// Try localStorage tility funciton
local.add('developer', {name: 'Gabriel', age: 33})
session.add('salary', 46000)

const $span = selectId('dev')

if ($span) {
    const developer = local.get('developer')
    const salary = session.get('salary')
    $span.textContent = `
        Nome: ${developer.name},
        Age: ${developer.age},
        Salary: ${salary}
    `
}