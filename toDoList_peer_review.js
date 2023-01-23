const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//! BUILD PAGE COTENTS

// const container = document.getElementById('container');
window.onload = () => { populateTasks(tasks); };

//! ADD AND REMOVE TASK

const btnInput = document.getElementById('btn_input');
btnInput.addEventListener('click', () => {
  const inputTask = document.getElementById('input_task').value;
  addTask(inputTask);
});

//FUNCTIONS


const addTask = (description) => {
  const arr = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = arr.length;
  const task = {};
  task.description = description;
  task.completed = false;
  task.index = index;
  arr.push(task);

  document.getElementById('taks_list').remove();
  document.getElementById('btn_clear').remove();
  document.querySelector('#input_task').value = '';
  populateTasks(arr);
};

//To build list

const buildList = (arr) => {
  const container = document.getElementById('container');
  const list = document.createElement('ul');
  const listItem = document.createElement('li');
  const itemCotent = document.createElement('div');
  const btnClear = document.createElement('button');

  btnClear.setAttribute('type', 'button');
  btnClear.setAttribute('id', 'btn_clear');
  btnClear.innerText = 'Clear all completed';
  list.setAttribute('id', 'taks_list');
  list.setAttribute('class', 'list-group js-interactive-list');
  listItem.setAttribute('class', 'list-group-item task_item ');
  itemCotent.setAttribute('class', 'task_details');

  const btnRemoveATask = document.createElement('a');
  btnRemoveATask.setAttribute('href', '#');
  btnRemoveATask.setAttribute('class', 'linkM');
  if (arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].index = i;
      btnRemoveATask.innerHTML = `
                  <i class="bi bi-three-dots-vertical" id="${arr[i].index}"></i>`;

      itemCotent.innerHTML = `
                    <input type="checkbox" id="check_task_${arr[i].index}" name="check_task" ${arr[i].completed ? 'checked' : ''}>
                    <p class="task_description checked" id="descrip${arr[i].index}">${arr[i].description}</p>
                    `;

      itemCotent.appendChild(btnRemoveATask);
      // append element
      listItem.appendChild(itemCotent);
      list.innerHTML += listItem.innerHTML;
    }
  }

  container.appendChild(list);
  container.appendChild(btnClear);

  for (let i = 0; i < arr.length; i += 1) {
    const paraDescription = document.getElementById(`descrip${i}`);
    if (arr[i].completed) {
      paraDescription.classList.add('checked');
    } else {
      paraDescription.classList.remove('checked');
    }
  }
  localStorage.setItem('tasks', JSON.stringify(arr));
  // remove a task

  // clear checked
};

//Remove completed task

const removeCompletedTask = () => {
  const arr = JSON.parse(localStorage.getItem('tasks')) || [];
  // populateTasks(arr)
  const elt = arr.filter((task) => task.completed !== true);
  return elt;
};

//Remove a Task

const removeTask = (description) => {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  const newArr = arr.filter((task) => task.description !== description);
  arr = [...newArr];

  return arr;
};

//pupulate task according to the length of the array

const populateTasks = (arr) => {
  buildList(arr);
  const list = document.getElementById('taks_list');
  const btnClear = document.getElementById('btn_clear');

  // remove a task by his description
  
  list.addEventListener('click', (e) => {
    if (Number.isInteger(Number(e.target.id))) {
      const index = e.target.id;
      const description = document.getElementById(`descrip${index}`).innerText;
      removeTask(description);
      document.getElementById('taks_list').remove();
      document.getElementById('btn_clear').remove();
      populateTasks(removeTask(description));
    }
  });
  //Check box
  const listCheckBox = document.querySelectorAll('[type="checkbox"]');
  [].forEach.call(listCheckBox, (checkBox) => {
    checkBox.addEventListener('click', (e) => {
      const checkIndex = e.target.id;
      for (let i = 0; i < arr.length; i += 1) {
        if (checkIndex.includes(`${i}`)) {
          if (arr[i].completed) {
            arr[i].completed = false;
          } else {
            arr[i].completed = true;
          }
        }
      }
      document.getElementById('taks_list').remove();
      document.getElementById('btn_clear').remove();

      populateTasks(arr);
    });
  });
  //Clear completed
  btnClear.addEventListener('click', () => {
    document.getElementById('taks_list').remove();
    document.getElementById('btn_clear').remove();
    populateTasks(removeCompletedTask());
  });
};

