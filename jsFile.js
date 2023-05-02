//Document object model is used when we need to modify html by using js

const taskContainer = document.querySelector(".task__container");
const globalStore = [];//array of objects

console.log(taskContainer);

const generateNewCard = (taskData) => `
   
        <div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id}>
            <div class="card">
                <div class="card-header d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="card-body">
                    <img class="card-img-top" src=${taskData.imageUrl}
                        alt="Card image cap">
                    <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
                    <p class="card-text">${taskData.taskDescription}</p>
                    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                </div>
            </div>
        </div>
   
`;

const loadInitialCardData = () => {
    //local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    //convert to normal object
    const {cards} = JSON.parse(getCardData);


    //loop over those array of task object to create HTML card,inject it in to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        //update our globalStore
        globalStore.push(cardObject);
    }

    )

};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,  //$ is used because we're storing something dynamic
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };

   
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({ cards: globalStore }));// stringify converts object of objects to array of objects,cards is a random key and globalStore is the value



};
//Parent of any DOM is document
//Date.now gives a unique id

//Issues

//1.Page refreshes causes the data to be deleted:
//API->Application Programming Interface
//Local storage->accessing application via local storage
//Interface->Interface means middle man


//2.Features-Delete,search,edit