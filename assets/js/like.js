console.log('Hello')
const likeButtons = document.querySelectorAll('.like-Post');
for(let likeButton of likeButtons){
    likeButton.addEventListener('click',likeButtonListener);
}
const toggler = function(likeButton){
    if(likeButton.style.color == 'black')
        likeButton.style.color = 'red';
    else
        likeButton.style.color='black';
}

function likeButtonListener(event){
const parent_id = event.currentTarget.id;
toggler(event.currentTarget);
console.log(event.currentTarget.id.split('-')[1])
$.ajax({
    type:'post',
    url:'/like/',
    data:{
        likable_id:event.currentTarget.id.split('-')[1],
        entity_type:event.currentTarget.className.split('-')[1]
    }
})
}