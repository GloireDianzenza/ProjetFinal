const url = new URL(window.location);
const searchParam = url.searchParams;
const id = searchParam.get("id");
if(id == null || id.trim() == '')window.location = "index.html";
let currentUser;

async function define(){
    let request = await fetch("http://localhost:3500/api/user/user/"+id);
    let data = await request.json();
    return data;
}

define().then(data=>{
    currentUser = data;
})
.then(()=>{
    console.log(currentUser);
    if(currentUser.error){
        // window.location = "index.html";
    }
    else if(currentUser.admin == 1){
        window.location = "accueil_admin.html?id="+id;
    }
})

logout.addEventListener("click",()=>{
    fetch("http://localhost:3500/api/user/reset",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            'Accept':"application/json",
        }
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        // window.location = "index.html";
    })
});

async function getPosts(){
    let request = await fetch("http://localhost:3500/api/post/");
    let result = await request.json();
    for(let post of result){
        let dateSplit = post.date.split("-");
        let year = parseInt(dateSplit[0]);
        let month = parseInt(dateSplit[1])-1;
        let day = parseInt(dateSplit[2]);
        
        let currentDate = new Date(year,month,day);
        post.dateAlt = currentDate;
    }
    result.sort((a,b)=>{
        return b.dateAlt - a.dateAlt;
    });
    result.sort((a,b)=>{
        return b.dateAlt - a.dateAlt;
    });
    console.log(result);
    
    for(let post of result){
        let userMail = null;
        
        let postID = post.id;

        fetch("http://localhost:3500/api/user/user/"+post.UserId)
            .then(response=>response.json())
            .then(data2=>{
                userMail = data2.email;
                let newerPost = "";

                fetch("http://localhost:3500/api/comment/list",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        'Accept':"application/json",
                    },
                    body:JSON.stringify({id:postID})
                })
                .then(response=>response.json())
                .then(async data3=>{

                    let commentHTML = "";

                    for(let comment of data3){
                        let request = await fetch("http://localhost:3500/api/user/user/"+comment.UserId);
                        let data4 = await request.json();
                        commentHTML += `
                                <div class="comment flex flex-col justify-around items-center">
                                    <h2 class="text-left">${data4.email}</h2>
                                    <p class="text-xs">${comment.value}</p>
                                </div>
                            `;
                    }

                    newerPost = `
                                <h2 class="text-left">${userMail}</h2>
                                <strong class="text-center">${post.date}</strong>
                                <img src="${post.image}" alt="">
                                <p class="text-left">${post.texte != null ? post.texte : ""}</p>
                                <div class="comments flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll max-h-32 gap-2">
                                    ${commentHTML}
                                </div>
                                <div class="buttons flex justify-center items-center">
                                    <a href="add_comment.html?id=${id}&post=${post.id}"><button type="button" class="bg-yellow-300 p-2 mt-5 rounded-md hover:font-bold hover:bg-white transition duration-300 ease-in-out">Comment</button></a>
                                </div>
                            `;

                            let pst = document.createElement("div");
                            pst.classList.add("post","p-3","shadow-xl","rounded-lg","border-black","border-opacity-10","min-w-60","text-center","flex","flex-col","gap-5");
                            pst.innerHTML = newerPost;
                            document.querySelector(".posts").appendChild(pst);



                    })
                .catch(error=>{throw new Error(error)});

            })
            .catch(error=>{
                throw new Error(error);
            });
    }

    newPost.closest("a").href += id;
    viewPosts.closest("a").href += id;
}
getPosts();