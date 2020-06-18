const addForm = document.querySelector(".add")
const newTask = document.querySelector("#new-task")
const addButton = document.querySelector(".add-btn")
const listItems = document.querySelector("ul")
const searchForm = document.querySelector(".search")
const addAlert = document.querySelector(".add-alert")
const resetButton = document.querySelector(".reset-btn")


const loadItems = () => {
    let itemArray = JSON.parse(localStorage.getItem("tasks")) || []

    if (itemArray.length > 0) {
        itemArray.forEach(item => {
            if (item.name) {
                generateItemList(item.name)
                listItems.children[0].firstChild.classList.add(item.line)
                listItems.children[0].children[1].children[0].classList.add(item.line)
            }
        })
    } else {
        localStorage.clear()
    }
}

const generateItemList = (item) => {
    //create nodes
    const resetBtn = document.createElement("button")
    const li = document.createElement("li")
    const shopItem = document.createElement("span")
    const icons = document.createElement("span")
    const checkIcon = document.createElement("i")
    const trashIcon = document.createElement("i")

    //add class
    li.classList.add("list-group-item")
    shopItem.classList.add("item")
    checkIcon.classList.add("far", "fa-check-circle")
    trashIcon.classList.add("fas", "fa-trash")
    icons.classList.add("icon-wrapper")

    //add content
    shopItem.textContent = `${item}`
  
    //append child nodes
    li.appendChild(shopItem)
    icons.appendChild(checkIcon)
    icons.appendChild(trashIcon)
    li.appendChild(icons)


    //append new items before others
    listItems.prepend(li)

}


const addItems = (e) => {

    e.preventDefault()
    const newItem = addForm.add.value.trim()

    //save to local storage
    let itemArray = JSON.parse(localStorage.getItem("tasks")) || []
    let obj = { name: newItem, line: "none" }

    itemArray.push(obj)
    localStorage.setItem("tasks", JSON.stringify(itemArray))

    if (newItem.length) {
        generateItemList(newItem)
        addAlert.classList.add("d-none")
    } else {
        addAlert.classList.remove("d-none")
        localStorage.removeItem()
    }

    addForm.reset()
}

const deleteItem = (e) => {

    if (e.target.parentNode.parentNode.firstChild.classList.contains("done")) {
        e.stopPropagation()
    }

    if (e.target.classList.contains("fa-check-circle") && !e.target.parentNode.parentNode.firstChild.classList.contains("done")) {

        let taskArray = JSON.parse(localStorage.getItem("tasks"))

        const getTaskDone = e.target.parentNode.parentNode.firstChild
        e.target.classList.add("done")
        getTaskDone.classList.add("done")

        taskArray.map(task => {
            if (task.name === `${getTaskDone.textContent}`) {
                task.line = 'done'
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskArray))
    }

}

const removeItem = (e) => {

    e.preventDefault()

    if (e.target.classList.contains("fa-trash")) {
        e.target.parentNode.parentNode.remove()
        let taskArray = JSON.parse(localStorage.getItem("tasks"))
        taskArray.map((task, i) => {
            if (task.name === e.target.parentNode.parentNode.textContent)
                taskArray.splice(i, 1)
        })

        localStorage.setItem("tasks", JSON.stringify(taskArray))
    }

}

const filterItems = () => {

    let searchInput = searchForm.search.value.trim()
    let itemArray = Array.from(listItems.children)

    itemArray
        .filter(item => !item.textContent.includes(searchInput))
        .map(item => item.classList.add("hide"))

    itemArray
        .filter(item => item.textContent.includes(searchInput))
        .map(item => item.classList.remove("hide"))

}

const reset = (e) => {
    e.preventDefault()
    console.log(listItems.children)
    listItems.innerHTML = ""
    localStorage.clear()
}

window.addEventListener("load", loadItems)
addButton.addEventListener("click", (e) => addItems(e), false)
listItems.addEventListener("click", (e) => deleteItem(e))
listItems.addEventListener("click", (e) => removeItem(e))
searchForm.addEventListener("keyup", filterItems)
resetButton.addEventListener("click", (e) => reset(e))

