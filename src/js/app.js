const arrayOfNotes = [];
const template = require('../template/node.html');

const createElement = function createNoteElement () {
    let noteTitleValue = document.getElementById('modalWindowTitle').value;
    let noteDescriptionValue = document.getElementById('modalWindowDescription').value;
    let notePriorityValue = document.getElementById('modalWindowPriority').value;
    let noteSectionField = document.getElementById('notes-field');
    let node = {
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
