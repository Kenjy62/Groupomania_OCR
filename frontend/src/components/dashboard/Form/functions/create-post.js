export function postPreview(data){
    let html = `<div id="post">
    <div class='post--user--infos'>
      <img src='https://picsum.photos/id/237/200/300'></img>
      <span>${data.name}</span>
    </div>
    <div class='post--content'>
      <div class='post--content--infos'>
        <p>${data.text}</p>
      </div>
      <div class='post--content--infos--image' style="${data.imageUrl == ''? 'display : none' : 'display: block'}">
        <div style={{position: 'relative'}}><img src="http://localhost:3000/images/${data.imageUrl != "" ? data.imageUrl : ''}"></img></div>
      </div>
      <div class='post--content--actions'>
        <span>Répondre</span>
        <span>Commentaires</span>
        <span>Like</span>
        <span>Dislike</span>
      </div>
    </div>
  </div>`
  document.getElementById('post--feed').insertAdjacentHTML('afterbegin', html)
}