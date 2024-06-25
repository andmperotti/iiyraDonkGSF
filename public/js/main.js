const deleteBtn = document.querySelectorAll('.del')
const deleteJobBtn = document.querySelectorAll('.deljob')
const requestedItem = document.querySelectorAll('span.not')
const itemComplete = document.querySelectorAll('span.completed')
const deleteBuildBtn = document.querySelectorAll('.delBuild')


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
Array.from(deleteBuildBtn).forEach((el)=>{
    el.addEventListener('click', deleteBuild)
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

async function deleteBuild(){
    const requestId = this.parentNode.dataset.id
    try{
        const response = await fetch('builds/deleteBuild', {
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


//functionality to calculate time until next labyrinth reset

function timeUntilMidnightUTC() {
    const now = new Date();
    const nowUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    ));

    const midnightUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1, // move to next day
      0, 0, 0, 0
    ));

    const timeDifference = midnightUTC - nowUTC;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  function displayTimeUntilMidnightUTC() {
    const time = timeUntilMidnightUTC();
    document.getElementById('time').textContent = `Lab resets in: ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  }

  // Call the function to display the time when the page loads
  displayTimeUntilMidnightUTC();