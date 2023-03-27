

// Method to submit the form data for new post
let create_post = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function (data) {
                    let newPost = data.data.post;
                    let username = data.data.username;
                    let postDom = newPostDom(newPost,username)
                    // Added to the DOM
                    $('#posts-list-container>ul').prepend(postDom);
                    $('textarea', newPostForm).val('');
                    // Adding Click Listners to post delete buttons
                    deletePost($(' .delete-post-button',postDom))
                    flash(data.data.flash.type,data.data.flash.message);
                  },error:function(err){
                    console.log(err.responseText);
                  }
            })
        })
    }();

// Function to add new post to the DOM
let newPostDom = function(post,username){
    
    return $(`<li id="post-${post._id}" style="border: 1px solid black; margin:10px">
    
        <a class="delete-post-button" href="/post/destroy/${post._id}" method="POST">
            X
        </a>
        
            ${post.content}
                <span style="color:green">
                    ${username}
                  </span>
                <div id="comments-container">
                    <ul style="color:red">
                        

                    </ul>
                </div>
                <form action="/comment/create" method="POST" id="${post._id}" class="create-new-comment">
                    <input type="text" name="content" placeholder="Write a comment..." form="${post._id}">
                    <input type="hidden" name="postID" value="${post._id}" form="${post._id}">
                    <input type="submit" form="${post._id}" hidden />
                </form>
            </li>`);
}

// Adding delete listners to delete post buttons
let deletePost = function(deleteLink){

$(deleteLink).click(function (e){
    e.preventDefault(); 
    $.ajax({
        type:'get',
        url: $(deleteLink).prop('href'),
        success:function(data){
            console.log(`post-${data.data.post_id}`)
            $(`#post-${data.data.post_id}`).remove();
            flash(data.data.flash.type,data.data.flash.message);
    },error:function (err) {
        console.log(err.responseText);
    }})
})
};
   
// Method to add Delete Listners to posts

for(let btn of $('.delete-post-button'))
{
    deletePost(btn)
}

// Flashing Notification

 let flash = function(type,text){
    new Noty({
        theme: 'relax',
        text: text,
        type: type,
        layout: 'topRight',
        timeout: 1500
    }).show();
}

// let create_comment = function(e){
//    e.preventDefault();
//    $.ajax({
//     type:'post',
//     url:'/post/create',
//     data:e.currentTarget
//    })
// }




let createComment = function (form)
{
    $(form).submit(function(event){
        event.preventDefault();
        $.ajax({
                type:'post',
                url:'/comment/create',
                data:$(form).serialize(),
                success:function(data){
                    let newComment = newCommentDOM(data.data.comment,data.data.username);
                    $(`#post-${data.data.postID} #comments-container ul`).prepend(newComment);  
                    // deletePost($(' .delete-post-button',postDom))
                    addDeleteCommentListner($(' .delete-comment-button',newComment));
                    $('input[type=text]',form).val('');

                },error:function(err){
                    console.log("Error:",err)
                }   
                });
})
}  

let newCommentDOM = function(comment,username)
{
    return $(`<li id="comment-${comment._id}">
              ${comment.content }  ${username}
              <a class = "delete-comment-button" href="/comment/destroy/${comment._id}">Delete</a><br>
</li>`)
}
    

let addDeleteCommentListner = function(deleteTag){
    $(deleteTag).click(event => {
        event.preventDefault();
        $.ajax({type:'get',
        url: $(deleteTag).prop('href'),
        success:function(data){
            console.log($(`#comment-${data.data.commentID}`));
            $(`#comment-${data.data.commentID}`).remove();
            
    },error:function (err) {
        console.log(err.responseText);
    }
  })
})};






for(let btn of $('.delete-comment-button'))
{
    addDeleteCommentListner(btn);
}


for(let btn of $('.create-new-comment') )
{
    createComment($(btn));

}


