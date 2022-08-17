import {Link} from 'react-router-dom'

export function AddPost(item){
    if(item.imageUrl !== ''){
        let html = `
        <div id="post" postId="${item._id}">
            <div class='post--user--infos'>
                <img src='https://picsum.photos/id/237/200/300'></img>
            </div>
            <div class='post--content'>
                <div class='post--content--infos'>
                    <p>${item.text}</p>
                </div>
                <div class='post--content--infos--image'>
                    <div style={{position: 'relative'}}>
                        <img src='${item.imageUrl}'></img>
                    </div>
                </div>
                <div class='post--content--actions'>
                    <span>Répondre</span>
                    <span>Commentaires</span>
                    <a href="/api/post/reaction"><span>Like</span></a>
                    <span>Dislike</span>
                </div>
            </div>
        </div>`
        document.getElementById('post--feed').insertAdjacentHTML('beforeend', html)
    } else {
        let html = `
        <div id="post" postId="${item._id}">
        <div class='post--user--infos'>
            <img src='https://picsum.photos/id/237/200/300'></img>
        </div>
        <div class='post--content'>
            <div class='post--content--infos'>
                <p>${item.text}</p>
            </div>
            <div class='post--content--actions'>
                <span>Répondre</span>
                <span>Commentaires</span>
                <span>Like</span>
                <span>Dislike</span>
            </div>
        </div>
    </div>`
    document.getElementById('post--feed').insertAdjacentHTML('beforeend', html)
    }
}
