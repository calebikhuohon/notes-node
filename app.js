const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');
const yargs = require('yargs');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

var argv = yargs
.command('add','Add a new note', {
title: titleOptions,
body: bodyOptions
})
.command('list','List all notes')
.command('read','Read a note', {
    title: titleOptions
})
.command('remove','Remove a note', {
    title: titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('note title taken'); 
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`printing ${allNotes.length} notes(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('note found');
        notes.logNote(note);
    } else {
        console.log(`note not found`);
    }

}
else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('command not recognized');
}