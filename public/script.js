function habilitarEdicion(id) {
    console.log('Editando estudiante con ID:', id);
    const listItem = document.querySelector(`.student-item[data-id='${id}']`);
    console.log('Item de estudiante:', listItem);
    if (!listItem) {
        console.error('No se encontró el elemento del estudiante');
        return;
    }

    const nombresInput = document.getElementById(`nombres_${id}`);
    const apellidosInput = document.getElementById(`apellidos_${id}`);
    const codigoInput = document.getElementById(`codigo_${id}`);
    const epInput = document.getElementById(`ep_${id}`);
    
    if (!nombresInput || !apellidosInput || !codigoInput || !epInput) {
        console.error('No se encontraron los campos de texto');
        return;
    }

    apellidosInput.style.display = 'inline-block';
    codigoInput.style.display = 'inline-block';
    epInput.style.display = 'inline-block';

    const saveButton = listItem.querySelector('.save-button');
    saveButton.style.display = 'inline-block';
}

function guardarEdicion(id) {
    const nombresInput = document.getElementById(`nombres_${id}`).value;
    const apellidosInput = document.getElementById(`apellidos_${id}`).value;
    const codigoInput = document.getElementById(`codigo_${id}`).value;
    const epInput = document.getElementById(`ep_${id}`).value;

    fetch(`/estudiantes/${id}/editar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nombres: nombresInput,
            apellidos: apellidosInput,
            codigo: codigoInput,
            ep: epInput
        })
    }).then(response => {
        if (response.ok) {
            location.reload();
        } else {
            console.error('Error al guardar los cambios');
        }
    }).catch(error => {
        console.error('Error al guardar los cambios', error);
    });

    const saveButton = document.querySelector(`.student-item[data-id='${id}'] .save-button`);
    saveButton.style.display = 'none';
}
