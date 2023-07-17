const addbtn=document.querySelector("#add-btn");
const newtaskinput=document.querySelector("#wrapper input");
const taskcontainer=document.querySelector("#tasks");
const error=document.getElementById("error");
const countvalue=document.querySelector(".count-value");
let taskcount=0;

const displaycount= (taskcount) =>{
    countvalue.innerText=taskcount;
};

const addtask= () =>{
    const taskname=newtaskinput.value.trim();
    error.style.display="none";
    //if taskname input is empty display error message for sometime
    if(!taskname){
        setTimeout(() =>{
            error.style.display="block";
        }, 200);
        return;
    }

    //if taskname input is not empty create a new task
    const task=`<div class="task">
        <input type="checkbox" class="task-check">
        <span class="Taskname">${taskname}</span>
        <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
        <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;
    //add new task below existing task
    taskcontainer.insertAdjacentHTML("beforeend",task);

    const deletebuttons=document.querySelectorAll(".delete");
    deletebuttons.forEach((button) =>{
        button.onclick =() =>{
            button.parentNode.remove();
            taskcount-= 1;
            displaycount(taskcount);
        };
    });

    const editbuttons=document.querySelectorAll(".edit");
    editbuttons.forEach((editbutton) =>{
        editbutton.onclick =(e) =>{
            let targetelement=e.target;
            if(!(e.target.className == "edit")){
                targetelement=e.target.parentElement;
            }
            newtaskinput.value = targetelement.previousElementSibling?.innerText;
            targetelement.parentNode.remove();
            taskcount-=1;
            displaycount(taskcount);
        };
    });
    const taskscheck=document.querySelectorAll(".task-check");
    taskscheck.forEach((checkbox) =>{
        checkbox.onchange = () =>{
            checkbox.nextElementSibling.classList.toggle("completed");
            if(checkbox.checked){
                taskcount-=1;
            }
            else{
                taskcount+=1;
            }
            displaycount(taskcount);
        };
    });
    taskcount+=1;
    displaycount(taskcount);
    newtaskinput.value="";
};

addbtn.addEventListener("click",addtask);

window.onload= () =>{
    taskcount=0;
    displaycount(taskcount);
    newtaskinput.value="";
}