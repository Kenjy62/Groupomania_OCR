
    let textarea = document.getElementById('addPost')
    textarea.addEventListener('keyup', function(){
        console.log(this)
        this.style.height = "1px";
        this.style.height = (25+this.scrollHeight)+"px";
    })

