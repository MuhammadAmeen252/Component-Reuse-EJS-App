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

//updating component after from submission
$('#update_component').submit(function(event){

    event.preventDefault()
    //after submitting form all the submitted data will be inside this array
    var unindexedArray = $(this).serializeArray()
    let data = {'id':'','name':'','code':''}
    let keys = Object.keys(data)
    unindexedArray.map((item,i) => {
        data[keys[i]] = item['value']
    })

    var request = {
        "url":`http://localhost:3000/api/Component/${data.id}`,
        "method":"PATCH",
        "data":data
    }
    $.ajax(request).done(function(res) {
        
        alert('Component updated successfully!')
        window.location.href = '/'
    })
})

//deleting component
$('table > tbody > tr > td > a.delete').click(function() {
    var id =$('table > tbody > tr > td > a.delete').attr("data-id")
    console.log('id',id)
    var request = {
        "url":`http://localhost:3000/api/Component/${id}`,
        "method":"DELETE",
    }
    if(confirm("Are you sure you want to delete this Component?")){
        $.ajax(request).done(function(res) {
            alert('Component deleted successfully!')
            location.reload()
        })
    }

})
