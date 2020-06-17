const newTask = document.querySelector("#new-task")
const addButton = document.querySelector("#add-btn")
const taskList = document.querySelector("task-list")
const listItems = document.querySelector("ul")
// const tickIcon = document.querySelector(".fa-check-circle")
// const trashIcon = document.querySelector(".fa-trash")


const addTask = () => {

    const li = document.createElement("li")

    li.innerHTML = `<span class="task">${newTask.value}</span>
    <i class="far fa-check-circle incomplete"></i>
    <i class="fas fa-trash"></i>`


    li.classList.add("list-group-item")
    listItems.prepend(li)
    newTask.value = ""

}

const completeTask = (e) => {

    if (e.target.classList.contains("fa-check-circle")) {
        const getTaskDone = e.target.parentNode.firstChild

        e.target.classList.toggle("done")
        getTaskDone.classList.toggle("done")
    }
}



addButton.addEventListener("click", addTask)
listItems.addEventListener("click", completeTask)


