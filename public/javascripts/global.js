$(document).ready(function() {
   $('#btnAddUser').on('ping self', pingSelf);
   $('#btnAddUser').on('ping others', pingOthers);
});

function pingSelf(event) {
    event.preventDefault();

    $.ajax({
        type: 'GET',
        url: '/v1/ping/self',
        dataType: 'JSON'
    }).done(function( data ) {
	document.write(data)
    });

}
