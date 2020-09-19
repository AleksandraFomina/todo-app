const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list');
let todoList = []

inputElement.addEventListener('keydown', event =>{
	if(event.key === 'Enter' || event.keyCode ===13){
		todoList.unshift({
			content: inputElement.value,
			done: false,
			selected: false
		})
		inputElement.value = ''
		upgradeView()
	}
})

function upgradeView() {
	ulElement.innerHTML = '';
	for(let index = 0; index <todoList.length; ++index){
		todoItem = todoList[index]

		const liElement = document.createElement('li')
		liElement.className = "list-group-item"
		ulElement.append(liElement)

		const divElement = document.createElement('div');
		divElement.className = "form-group form-check"
		liElement.append(divElement)

		const checkboxElement = document.createElement('input');
		divElement.append(checkboxElement)
		checkboxElement.type = 'checkbox'
		checkboxElement.className = "form-check-input"
		checkboxElement.id = 'todoItem' + index
		checkboxElement.checked = todoItem.selected

		const labelElement = document.createElement('label');
		divElement.append(labelElement)
		labelElement.className ="form-check-label"
		labelElement.setAttribute('for', 'todoItem' + index); 
		if(todoItem.done){
			labelElement.className += " todoDone" 
		}
		labelElement.innerText = todoItem.content


		const buttonDoneElement = document.createElement('button');
		divElement.append(buttonDoneElement)
		buttonDoneElement.type = "button"
		buttonDoneElement.className = "btn btn-primary"
		buttonDoneElement.innerText = 'Done'

		const buttonRemoveElement = document.createElement('button');
		divElement.append(buttonRemoveElement)
		buttonRemoveElement.type = "button"
		buttonRemoveElement.className = "btn btn-danger"
		buttonRemoveElement.innerText = 'Remove'

		buttonDoneElement.addEventListener('click', () => {
			todoList[index].done = !todoList[index].done
			upgradeView()
		});

		buttonRemoveElement.addEventListener('click', () => {
			todoList.splice(index, 1)
			upgradeView()
		}); 

		checkboxElement.addEventListener("change", () =>{
			todoList[index].selected = checkboxElement.checked
		})
	
	}
}


document.getElementById('doneAction').addEventListener('click', () => {
	for(const todoItem of todoList){
			if(todoItem.selected){
				todoItem.done = true
				todoItem.selected = false
			}
	}
	upgradeView()
});
document.getElementById('restoreAction').addEventListener('click', () => {
	for(const todoItem of todoList){
			if(todoItem.selected){
				todoItem.done = false
				todoItem.selected = false
			}
	}
	upgradeView()
});
document.getElementById('removeAction').addEventListener('click', () => {
	todoList = todoList.filter(todoItem => !todoItem.selected)
	upgradeView()
});

document.getElementById('test').addEventListener('click', () => {
	for(const todoItem of todoList){
		todoItem.selected = true
	}
	upgradeView()
});

