const input = document.getElementById('input');
const btnAdd = document.querySelector('.buttonAdd');
const btnEdit = document.querySelector('.buttonEdit');
const btnRemove = document.querySelector('.buttonRemove');
const btnRemoveItem = document.querySelector('.buttonRemoveItem');
const list = document.querySelector('.sidebar-ul');
const localDate = document.querySelector('.date');

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(input.value);
  let li = document.createElement('li');
  li.className = 'sidebar-li';
  if (input.value.trim() == '') {
    alert('write your task!');
  } else {
    const currentDate = new Date();
    const date = `${currentDate.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
    })} ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    let p = document.createElement('p');
    p.innerText = input.value.trim();
    let span = document.createElement('span');
    span.className = 'span-date';
    span.innerText = date;
    list.appendChild(li);
    li.appendChild(p);
    li.appendChild(span);
    input.value = '';
    li.classList.remove('active');

    li.addEventListener('click', () => {
      // input.value = p.innerText;
      // p.innerText = input.value.trim();
      if (!li.classList.contains('active')) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }

      // console.log(li);
    });
  }
});

btnRemove.addEventListener('click', () => {
  list.removeChild(li);
  li.classList.remove('active');
});

let isEditMode = false;
btnEdit.addEventListener('click', () => {
  // e.preventDefault();
  // console.log(input.value);
  const acttiveTask = document.querySelector('li.active');

  if (acttiveTask) {
    const pElement = acttiveTask.querySelector('p');
    if (!isEditMode) {
      input.value = pElement.innerText;
      isEditMode = true;
    } else {
      pElement.innerText = input.value;
      isEditMode = false;
      input.value = '';
    }
  } else {
    alert('make your choice for edit task!');
  }
});

btnRemoveItem.addEventListener('click', () => {
  const acttiveTask = document.querySelector('li.active');
  if (acttiveTask) {
    acttiveTask.remove();
    input.value = '';
  } else {
    alert('make your choice and press the button!');
  }
});

function filterTask() {
  const inputValue = document.getElementById('search').value.toLowerCase();
  const tasks = document.querySelectorAll('.sidebar-li');

  for (const task of tasks) {
    const taskName = task.innerText.toLowerCase();
    if (!taskName.includes(inputValue)) {
      task.classList.add('hidden');
    } else {
      task.classList.remove('hidden');
    }
  }
}

const inputValue = document.getElementById('search');
inputValue.addEventListener('keyup', filterTask);
filterTask();
