const deleteBtn = document.querySelectorAll('.del')
const deleteJobBtn = document.querySelectorAll('.deljob')
const requestedItem = document.querySelectorAll('span.not')
const itemComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteRequested)
})
Array.from(deleteJobBtn).forEach((el)=>{
    el.addEventListener('click', deleteJob)
})
Array.from(requestedItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(itemComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteRequested(){
    const requestId = this.parentNode.dataset.id
    try{
        const response = await fetch('request/deleteRequested', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requestIdFromJsFile': requestId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteJob(){
    const requestId = this.parentNode.dataset.id
    try{
        const response = await fetch('jobs/deleteJob', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requestIdFromJsFile': requestId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const requestId = this.parentNode.dataset.id
    try{
        const response = await fetch('request/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requestIdFromJsFile': requestId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const requestId = this.parentNode.dataset.id
    try{
        const response = await fetch('request/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requestIdFromJsFile': requestId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}