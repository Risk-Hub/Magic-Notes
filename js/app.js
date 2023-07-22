console.log("Welcome to notes website");
showNotes();

//If user clicks on add note button
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");

  // let var_name = document.getElementsByClassName("myValidation");
  if(addTxt.value == "" && addTitle.value == ""){
    alert("Add a Title or a Note first");
  }
  else{
    
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesObject = [];
      } else {
        notesObject = JSON.parse(notes);
      }
      let myObj = {
        title: addTitle.value,
        note: addTxt.value,
      };
      notesObject.push(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObject));
      addTxt.value = "";
      addTitle.value = "";

  }
  showNotes();
  // console.log(e);
});

//Function to show already existing notes in the localStorage
function showNotes(element, index) {
  // alert("Some message here");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObject = [];
  } else {
    notesObject = JSON.parse(notes);
  }
  let html = "";
  notesObject.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.note}</p>
        <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
    </div>`;
  });
  let notesElement = document.getElementById("notes");
  if (notesObject.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `Nothing to show here! Use "Add a Note" to add your notes.`;
  }
}

//Function to delete a note
function deleteNode(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObject = [];
  } else {
    notesObject = JSON.parse(notes);
  }
  notesObject.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObject));
  showNotes();
}

//To search for a note
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function (e) {
  let searchTxt = document.getElementById("searchTxt");
  let inputValue = searchTxt.value;
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
  e.preventDefault();
});
