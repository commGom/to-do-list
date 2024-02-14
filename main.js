// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다
// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝탭은 끝난 아이템만, 진행 중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

// 1. Check 버튼 클릭할 때 true <-> false
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false 이면 안 끝난걸로 간주하고 그대로


let taskInput = document.getElementById("task-input");
console.log(taskInput)

let addButton = document.getElementById("add-button");
let tabs=document.querySelectorAll(".task-tabs div");
let taskList = [];

addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs);
function addTask() {
  // task 를 객체로 만들어서 저장 (할일 내용, 완료여부-기본값false), item에 unique한 value(random)로 부여할 것이다.
  let task={
    id:generateRandomID(),
    taskContent:taskInput.value,
    isComplete:false
  }
  taskList.push(task);
  render();
}

function render(mode='all') {
  let resultHTML = ''
  if(mode=='all'){
    for (let i = 0; i < taskList.length; i++) {
      const taskContent = taskList[i].taskContent
      if(taskList[i].isComplete==true){
        resultHTML += `<div class="task">
        <div class="task-done">${taskContent}</div>
        <div>
        <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
        <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
        </div>`;
      }else{
        resultHTML += `<div class="task">
        <div>${taskContent}</div>
        <div>
        <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
        <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
        </div>`;
      }
    }
  }else if(mode=='ongoing'){
    for (let i = 0; i < taskList.length; i++) {
      const taskContent = taskList[i].taskContent
      if(taskList[i].isComplete==false){
        resultHTML += `<div class="task">
        <div>${taskContent}</div>
        <div>
          <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>`;
      }
    }
  }else if(mode=='done'){
    for (let i = 0; i < taskList.length; i++) {
      const taskContent = taskList[i].taskContent
      if(taskList[i].isComplete==true){
        resultHTML += `<div class="task">
        <div>${taskContent}</div>
        <div>
          <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
          <button onClick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
      </div>`;
      }
    }
  }
    document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id){
  console.log("Check 됐음!")
  console.log("id:",id)
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      // taskList[i].isComplete=taskList[i].isComplete==true?false:true;
      taskList[i].isComplete=!taskList[i].isComplete;
      break;
    }
  }
  render(mode)
}

function generateRandomID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
  console.log("삭제하자!")
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      taskList.splice(i,1);
      break;
    }
  }
  render(mode)
}

let mode="all"

function filter(e){
  // 누구를 클릭했는지에 대한 event에 대한 정보를 매개변수로 받아옴
  console.log("filter",e.target.id);
  mode=e.target.id
  let filteredResultHTML=""
    // mode=='all'이면 전체리스트 보여준다
    // mode=='ongoing' 이면, isComplete가 false인 item을 보여준다.
    // mode=='done'이면 isComplete가 true인 item을 보여준다.
    render(mode)
}