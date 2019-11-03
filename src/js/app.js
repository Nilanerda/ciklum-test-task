const arrayOfNotes = [];
const template = require('../template/node.html');

const createElement = function createNoteElement () {
    let noteTitleValue = document.getElementById('modalWindowTitle').value;
    let noteDescriptionValue = document.getElementById('modalWindowDescription').value;
    let notePriorityValue = document.getElementById('modalWindowPriority').value;
    let noteSectionField = document.getElementById('notes-field');
    let randomNoteId = Math.random();
    let node = {
        'id': randomNoteId,
        'title':  noteTitleValue,
        'description' : noteDescriptionValue,
        'priority': notePriorityValue
    };
    arrayOfNotes.push(node);
    let injectNoteTemplate = template(node);
    noteSectionField.innerHTML +=  injectNoteTemplate;
};

const modalWindowCreateButton = document.getElementById('modalWindowCreateElement');
modalWindowCreateButton.addEventListener('click', createElement);

// const searchField = function searchByTitle (arr, query)  {
//     return arr.filter(el => el.toLowerCase.indexOf(query.toLowerCase) !== -1);
// };
//
// const searchInput = document.getElementById('searchInput');
//
// searchInput.addEventListener('keyup', function () {
//     searchField(arrayOfNotes, searchInput.value)
// });

