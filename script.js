function addNote() {
    if(!document.getElementById('input-note').value.trim()){
        window.alert('Por favor insira uma nota primeiro!');
    }else{
        var newNote = document.getElementById('input-note').value;

        var note = document.createElement('div');
        note.textContent = newNote;
        note.className = 'note';
        
        var lixo = document.createElement('button');
        lixo.className = 'lixo';
        lixo.addEventListener('click', () => {
            note.remove();
            saveNotes();
        });
        note.appendChild(lixo);
        
        var check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'check';
        check.addEventListener('change', () => {
            if(check.checked){
                check.style.backgroundColor = '#8515c1';
                note.style.textDecoration = 'line-through';
            }else{
                check.style.backgroundColor = '#202124';
                note.style.textDecoration = 'none';
            }
            saveNotes();
        });
        note.appendChild(check);

        var noteUl = document.querySelector('ul');
        noteUl.appendChild(note);
        
        document.getElementById('input-note').value = '';
        
        saveNotes();
    }
}

function saveNotes(){
    var notes = [];
    var noteElements = document.getElementsByClassName('note');
    
    for(var i = 0; i < noteElements.length; i++){
        var noteText = noteElements[i].textContent;
        var noteCompleted = noteElements[i].querySelector('.check').checked;
        
        notes.push({
            text: noteText,
            completed: noteCompleted
        });
    }
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes(){
    var storedNotes = localStorage.getItem('notes');

    if(storedNotes){
        var notes = JSON.parse(storedNotes);
        
        for(var i = 0; i < notes.length; i++){
            var note = notes[i];
            
            (function(){
                var noteElement = document.createElement('div');
                noteElement.textContent = note.text;
                noteElement.className = 'note';
                
                var lixo = document.createElement('button');
                lixo.className = 'lixo';
                lixo.addEventListener('click', deleteNote);
                noteElement.appendChild(lixo);
    
                var check = document.createElement('input');
                check.type = 'checkbox';
                check.className = 'check';
                check.addEventListener('change', function() {
                    if(check.checked){
                        check.style.backgroundColor = '#8515c1';
                        noteElement.style.textDecoration = 'line-through';
                    }else{
                        check.style.backgroundColor = '#202124';
                        noteElement.style.textDecoration = 'none';
                    }
                    saveNotes();
                });
                noteElement.appendChild(check);
                
                if(note.completed){
                    check.checked = true;
                    check.style.backgroundColor = '#8515c1';
                    noteElement.style.textDecoration = 'line-through';
                }
                
                var noteUl = document.querySelector('ul');
                noteUl.appendChild(noteElement);
            })();
        }
    }
}

function deleteNote(){
    this.parentNode.remove();
    saveNotes();
}

loadNotes();