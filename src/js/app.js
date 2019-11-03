
import Storage from "./storage"
import Helper from "./helper"
const template = require('../template/node.html');

const init = function init()
{
    Storage.init();
    render();
}

const closeModalWindow = function closeModalWindow() {
    var url = window.location.toString();
    window.location.href = url.split('#')[0];
}

const openModalWindow = function openModalWindow() {
    window.location.href = "#modalWindow";
}

const render = function renderTickets(filter = []) {
    let noteSectionField = document.getElementById('notes-field');
    noteSectionField.innerHTML = '';
    Storage.getAll().forEach(function(ticket) {
        let isTitleSearch = ('title' in filter && ticket.title.includes(filter.title)) || (!('title' in filter));
        let isStatusSearch = ('status' in filter && ticket.status === filter.status) || (!('status' in filter)) || (filter['status'] === 'all');
        let isPrioritySearch = ('priority' in filter && ticket.priority === filter.priority) || (!('priority' in filter)) || (filter['priority'] === 'all');
        if (isTitleSearch && isStatusSearch && isPrioritySearch) {
            noteSectionField.innerHTML += template(ticket);
        }
    });
}

const createTicket = function createTicket () {
    let id = document.getElementById('modalWindowId').value;
    let title = document.getElementById('modalWindowTitle').value;
    let description = document.getElementById('modalWindowDescription').value;
    let priority = document.getElementById('modalWindowPriority').value;
    if (id) {
        Storage.edit(id, title, description, priority);
    } else {
        Storage.save(title, description, priority);
    }
};

const removeTicket = function removeTicket(id) {
    Storage.remove(id);
}

const editTicket = function editTicket (id) {
    let ticket = Storage.get(id);

    let ticketId = document.getElementById('modalWindowId');
    let title = document.getElementById('modalWindowTitle');
    let description = document.getElementById('modalWindowDescription');
    let priority = document.getElementById('modalWindowPriority');
    ticketId.value = ticket.id;
    title.value = ticket.title;
    description.value = ticket.description;
    priority.value = ticket.priority;
};

const closeTicket = function closeTicket(id) {
    let ticket = Storage.get(id);
    ticket.status = 'done';
    Storage.set(id, ticket);
};

const searchTicket = function searchTicket() {
    let filter = [];
    let fields = document.querySelector('form').getElementsByClassName('searchable');
    for (let field of fields) {
        let fieldName = field.dataset.name;
        let fieldValue = field.value;
        filter[fieldName] = fieldValue;
    }

    render(filter);
}

const modalWindowCreateButton = document.getElementById('modalWindowCreateElement');
modalWindowCreateButton.addEventListener('click', function() {
    createTicket();
    closeModalWindow();
    render();
});

document.getElementById('notes-field').addEventListener('click', function(e) {
    let filter = [];
    if('moreOptionsEditNote' === e.target.id) {
        editTicket(e.target.dataset.id);
        openModalWindow();
        searchTicket();
    }

    if('moreOptionsDeleteNote' === e.target.id) {
        removeTicket(e.target.dataset.id);
        searchTicket();
    }

    if('moreOptionsStatusDone' === e.target.id) {
        closeTicket(e.target.dataset.id);
        searchTicket();
    }

});

let fields = document.querySelector('form').getElementsByClassName('searchable');
for (let field of fields) {
    if ('search' === field.type) {
        field.addEventListener('keyup', searchTicket);
    } else {
        field.addEventListener('change', searchTicket);
    }
}

init();
