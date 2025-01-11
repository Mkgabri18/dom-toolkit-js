import ClassList from './src/classList.js';
// import { onEvent } from './listenerEvent.js';
/* import { selectId } from './src/selectors.js'; */
import Selectors from './src/selectors.js';
import { local, session } from './src/storage.js'

const { selectId } = Selectors()

// onEvent($button, 'click', changecolor);
selectId('addColor').onClick(addChangecolor);
selectId('toggleColor').onClick(toggleChangecolor);
selectId('removeColor').onClick(removeChangecolor);
selectId('replacecolor').onClick(replacecolor);

console.log("not found elem. ", selectId('addColors'))
selectId('addColors')?.onClick(addChangecolor);

function addChangecolor() {
    const $desc = selectId('description');
    if ($desc) {
        ClassList($desc)
            .add('color-red')
            .add('font-xl')
    }
}

function toggleChangecolor() {
    const $desc = selectId('description');
    if ($desc) {
        ClassList($desc)
            .toggle('color-red')
    }
}

function removeChangecolor() {
    const $desc = selectId('description');
    if ($desc) {
        ClassList($desc)
            .remove('color-red')
            .remove('font-xl')
    }
}

function replacecolor() {
    const $desc = selectId('description');
    if ($desc) {
        ClassList($desc)
            .replace('color-red', 'color-blue')
    }
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