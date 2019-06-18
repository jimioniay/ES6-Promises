// Gatta use promises while using fetch :( 

document.querySelector("#get-text").addEventListener("click", getText);
document.querySelector("#get-json").addEventListener("click", getJson);
document.querySelector("#get-posts").addEventListener("click", getPosts);

function getText(e) {
    fetch("assets/data/data.txt")
        .then(function (response) {
            if (response.status === 200 && response.statusText === "OK") {
                return response.text();
            }
            else {
                console.log(response.text);
            }
        })
        .then(function (data) {
            // test();
            console.log(data);
            // display(data, "renderText");
            renderText(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    e.preventDefault();
}

function getJson(e) {
    fetch("assets/data/customers.json")
        .then(function (response) {
            if (response.status === 200 && response.statusText === "OK") {
                console.log(response.text);
                return response.text();
            }
            else {
                console.log(response.text);
            }
        })
        .then(function (data) {
            // test();
            console.log(data);
            // display(data, "renderText");
            renderJson(JSON.parse(data));
        })
        .catch(function (err) {
            console.log(err);
        });
    e.preventDefault();
}

function getPosts(e) {
    document.querySelector("#get-posts").disabled = true;
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            if (response.status === 200 || response.statusText === "OK") {
                console.log("inside if..." + response.text);
                return response.text();
            }
            else {
                console.log("inside else..." + response.statusText);
            }
        })
        .then(function (data) {
            // test();
            console.log(data);
            // display(data, "renderText");
            renderPosts(JSON.parse(data));
        })
        .catch(function (err) {
            console.log(err);
        });
        document.querySelector("#get-posts").disabled = false;
    e.preventDefault();
}

function test() {
    console.trace();
}

function renderText(data) {
    uiText = document.querySelector("#text");
    output = `<strong class = "text-center lead bold">${data}</strong>`;
    uiText.innerHTML = output;
}


function renderJson(data) {
    uiJSON = document.querySelector("#json");
    let output = "";
    data.forEach(customer => {
        output += `
        <ul class = "list-group">
        <li class = "list-group-item">ID: ${customer.id}</li>
        <li class = "list-group-item">Name: ${customer.name}</li>
        <li class = "list-group-item">Age: ${customer.age}</li>
        <li class = "list-group-item">Company: ${customer.company}</li>
        <li class = "list-group-item">Mobile Number: ${customer.mobileNumber}</li>
        </ul>
        `;
    });
    uiJSON.innerHTML = output;

}

function renderPosts(posts) {
    let output = "";
    console.log("type:     " + typeof posts);
    console.log(Object.entries(posts));
    posts.forEach((post) => {
        console.log("post: " + post)
        output += `
                            <div class="card p-3 text-left">
                            <blockquote class="blockquote mb-0">
                            <h5 class="card-title">#${post.title}</h5>
                              <p>${post.body}</p>
                              <footer class="blockquote-footer">
                                <small class="text-muted author">
                                   post by <cite title="Source Title">${(post.userId) === 1 ? "Ayomide" : "Anonymous"}</cite>
                                </small>
                              </footer>
                            </blockquote>
                          </div>
                `;
    });


    // for (let post in posts ) {
    //     console.log("post: " + post)
    //     output += `
    //                         <div class="card p-3 text-left">
    //                         <blockquote class="blockquote mb-0">
    //                         <h5 class="card-title">#${posts["title"]}</h5>
    //                           <p>${posts["body"]}</p>
    //                           <footer class="blockquote-footer">
    //                             <small class="text-muted author">
    //                                post by <cite title="Source Title">${(posts["userId"]) === 1 ? "Ayomide":  "Anonymous"}</cite>
    //                             </small>
    //                           </footer>
    //                         </blockquote>
    //                       </div>
    //             `;
    // }
    const uiPosts = document.querySelector("#post");
    uiPosts.innerHTML = output;
}