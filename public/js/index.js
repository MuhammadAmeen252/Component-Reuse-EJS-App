//adding alert message
$('#add_Component').submit(function(event){
    alert('Component created Successfully!')
})

//searching and filtering user
$('#search-button').click(function() {
    var name = $('#search-input').val()
    if(name){
        window.location.href = `/api/getComponent/${name}`
    }
    
})