import Helper from "./helper"
const SETTINGS_KEY = 'settings';
const DEAFULT_ITEM = {'keys': []};

const Storage = {
    init() {
        if (null === this.get(SETTINGS_KEY)) {
            this.set(SETTINGS_KEY, DEAFULT_ITEM);
        }
    },

    save(title, desctiption, priority) {
        let id = Helper.uuid();
        let ticket = {
            'id': id,
            'title':  title,
            'description' : desctiption,
            'priority': priority,
            'status': 'open'
        };

        let settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        settings.keys.push(id);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        localStorage.setItem(id, JSON.stringify(ticket));
    },

    edit(id, title, desctiption, priority) {
        let ticket = this.get(id);
        ticket.title = title;
        ticket.description = desctiption;
        ticket.priority = priority;
        localStorage.setItem(id, JSON.stringify(ticket));
    },

    remove(id) {
        let settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        let ticketId = settings.keys.indexOf(id);
        if (ticketId !== -1) {
            settings.keys.splice(ticketId, 1)
        }
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        localStorage.removeItem(id);
    },

    set(id, value) {
        return localStorage.setItem(id, JSON.stringify(value))
    },

    get(id) {
        return JSON.parse(localStorage.getItem(id));
    },

    getAll() {
        let tickets = [];
        let settings = this.get(SETTINGS_KEY);
        settings.keys.forEach(function(itemKey) {
            tickets.push(Storage.get(itemKey));
        });

        return tickets;
    }
};

export default Storage
