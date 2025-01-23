import ClassList from './src/classList.js';
// import { onEvent } from './listenerEvent.js';
/* import { selectId } from './src/selectors.js'; */
import Selectors from './src/selectors.js';
import { local, session } from './src/storage.js'

const { selectId } = new Selectors()

// onEvent($button, 'click', changecolor);
selectId('addColor').onClick(addChangecolor);
selectId('toggleColor').onClick(toggleChangecolor);
selectId('removeColor').onClick(removeChangecolor);
selectId('replacecolor').onClick(replacecolor);

console.log("not found elem. ", selectId(''))
// selectId('addColors')?.onClick(addChangecolor);

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