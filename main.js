function loadUserData(){
    let request = new XMLHttpRequest()
    let url = 'http://jsonplaceholder.typicode.com/users'
    request.open('GET', url, true)
  
    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        let data = JSON.parse(request.responseText)
        generateUserTable(data);
        
        
      }else{
        alert('Page Not Found!')
      }
    }
    request.onerror = function(){
      alert('Request Failed! Check Your internet connection!')
    }
    request.send()
  }
  
  function onDocumentFinish(){
    loadUserData()
  }
  
  function loadAlbumData(index){
    let request = new XMLHttpRequest()
    let btn = index.target;
    let userId = btn.getAttribute('user-id');
    let url = 'https://jsonplaceholder.typicode.com/albums?userId=' + userId
    

    request.open('GET', url, true)
    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        let data = JSON.parse(request.responseText)
        generateAlbumTable(data);
       

      }else{
        alert('Page Not Found!')
      }
    }
    request.onerror = function(){
      alert('Request Failed! Check Your internet connection!')
    }
    request.send()
  }
  
  function generateUserTable(data){
    let idx = 0
    let tbody = document.getElementById('tableUser').querySelector('tbody')
    tbody.innerHTML = ''
    for(idx =0;idx<data.length;idx++){
      let singleRow = document.createElement('tr')
      let colName = document.createElement('td')
      colName.appendChild(document.createTextNode(data[idx].name))
      let colEmail = document.createElement('td')
      colEmail.appendChild(document.createTextNode(data[idx].email))
      let colAddress = document.createElement('td')
      let address = data[idx].address
      colAddress.appendChild(document.createTextNode(address.street + '' + address.suite + '' + address.city))
      let colWebsite = document.createElement('td')
      colWebsite.appendChild(document.createTextNode(data[idx].website))
      let colCompany = document.createElement('td')
      colCompany.appendChild(document.createTextNode(data[idx].company.name))
      
      singleRow.appendChild(colName)
      singleRow.appendChild(colEmail)
      singleRow.appendChild(colAddress)
      singleRow.appendChild(colWebsite)
      singleRow.appendChild(colCompany)
  
      let colAlbum = document.createElement('td')
      let btnAlbums = document.createElement('button')
      btnAlbums.appendChild(document.createTextNode('Albums'))
      let userId = document.createAttribute('user-id')
      userId.value = data[idx].id
      let userName = document.createAttribute('user-name')
      userName.value = data[idx].name
      
      btnAlbums.setAttributeNode(userName)
      btnAlbums.setAttributeNode(userId)
  
      btnAlbums.addEventListener('click',loadAlbumData)
      colAlbum.appendChild(btnAlbums)
      singleRow.appendChild(colAlbum)
      tbody.appendChild(singleRow)
    }
  }
  
  function generateAlbumTable(data){
    let idx = 0
    let tbody = document.getElementById('tableAlbum').querySelector('tbody')
    tbody.innerHTML = ''
    for(idx =0;idx<data.length;idx++){
      let singleRow = document.createElement('tr')
      let colName = document.createElement('td')
      colName.appendChild(document.createTextNode(data[idx].title))
      singleRow.appendChild(colName)

      let colDetails = document.createElement('td')
      let btnDetails = document.createElement('button')
      btnDetails.appendChild(document.createTextNode('Details'))
      let albumId = document.createAttribute('album-id')
      albumId.value = data[idx].id
  
      btnDetails.setAttributeNode(albumId)
      btnDetails.addEventListener('click',loadPhotoData)
      colDetails.appendChild(btnDetails)
      singleRow.appendChild(colDetails)
      tbody.appendChild(singleRow)
    }
  }
  
  function loadPhotoData(index){
    let request = new XMLHttpRequest()
    let btn = index.target;
    let albumId = btn.getAttribute('album-id');
    let url = 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId
    

    request.open('GET', url, true)
    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        let data = JSON.parse(request.responseText)
        generatePhoto(data);
        

      }else{
        alert('Page Not Found!')
      }
    }
    request.onerror = function(){
      alert('Request Failed! Check Your internet connection!')
    }
    request.send()
  }
  
  function generatePhoto(data){
    let idx = 0
    let img = document.getElementById('photos')
    img.innerHTML = ''
    for(idx=0;idx<data.length;idx++){
      let url = document.createElement('img')
      url.setAttribute('src', data[idx].url)
      img.appendChild(url)
    }
  }