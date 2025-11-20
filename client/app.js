const todo = document.getElementById("todo_items");
const editForm = document.getElementById("editForm");
let editName = document.getElementById("edit_input_name");
let editDesc = document.getElementById("edit_input_description");

let url = "http://127.0.0.1:5000";

function load() {
    // Blank out div
    todo.innerHTML = '';
    // Refill 
    fetch(url + "/items")
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
            data.forEach(item => loadItems(item));
        })
    })
}

function loadItems(item) {
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let edit = document.createElement('section');
    edit.id = "editButton";
    let image = document.createElement("img");
    image.src = "pencil.svg";
    image.alt = "pencil image";
    edit.appendChild(image);
    
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "itemCheckbox";
    checkbox.name = "itemCheckbox";
    div.append(checkbox);
    
    div.append(h3);
    div.append(p);
    div.append(edit);

    h3.innerHTML = item.name;
    p.innerHTML = item.description;

    div.id = "todo_list_item";

    checkbox.onclick = function () {
        deleteItem(item.id);
    }

    edit.onclick = function () {
        editItem(item.id, h3.innerHTML, p.innerHTML);
    }

    todo.appendChild(div);
}

function editItem(id, name, desc) {
    editForm.style.visibility = "visible";
    editName.value = name;
    editDesc.value = desc;
    let save = document.getElementById("save_btn");

    save.onclick = function () {
        finishEdit(id, editName.value, editDesc.value);
    }
}
function finishEdit(id, n, desc) {
    let data = "name=" + encodeURIComponent(n);
    data += "&description=" + encodeURIComponent(desc);

    fetch(url + "/items/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(response => response.text())
    .then(data => {
        console.log("Edit successful:", data);
        editForm.style.visibility = "hidden";
    })
    .catch(error => console.error("Error:", error));
}

function deleteItem(id) {
    fetch(url + "/items/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

function addNewItem() {
    // Get Form data
    let name = document.querySelector("#item_input_name").value;
    let description = document.querySelector("#item_input_description").value;
    
    // Get it ready to send to the api
    let data = "name=" + encodeURIComponent(name);
    data += "&description=" + encodeURIComponent(description);

    // Send to API
    fetch(url + "/items", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function (response) {
        load(); // refresh list after saving
    })
    // display results
    load();
}



let allCheckBoxes = document.querySelectorAll(".itemCheckbox");
let button = document.querySelector("#submit_btn");
button.onclick = addNewItem;
load();
