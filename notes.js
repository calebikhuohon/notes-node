const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title, body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes); 
        return note;
    }
};

var getAll = () => {
    return fetchNotes();}

var getNote = (title) => {
    var notes = fetchNotes();
    var readNote = notes.filter((note) => note.title == title);
     return readNote[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    console.log('______');
    console.log(`title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNote
};