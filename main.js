// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다
// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝탭은 끝난 아이템만, 진행 중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
console.log(taskInput)

let addButton = document.getElementById("add-button");

let taskList = []

addButton.addEventListener("click", addTask)

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
}

function render() {
  let resultHTML = ''
  console.log(taskList)
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i]
    resultHTML += `<div class="task">
    <div>${task}</div>
    <div>
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
  }
  console.log(resultHTML)
  document.getElementById('task-board').innerHTML = resultHTML;
}