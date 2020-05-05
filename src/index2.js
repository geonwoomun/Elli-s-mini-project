'use strict'; // Ellie: Awesome!

// 엘리님 코멘트 적용해서 바꾼 버전.

async function loadData() {
  // json 파일로부터 데이터를 받아 오는 함수.
  const response = await fetch('./data.json');
  const data = await response.json();
  return data.dresses;
} // 복수의 이름으로 만들었습니다.

function filterDress(dresses, filterSubject, filterName) {
  //옷을 필터하는 함수
  const filteredDresses = dresses.filter(
    (dress) => dress[filterSubject] === filterName
  );
  renderList(filteredDresses);
}

const filter = (dresses) => (e) => {
    if (e.target.tagName === 'UL') {
        return;
      }
    let filterSubject = e.target.dataset.type; // 데이터 type과 value로 사용할 수 있게 고쳤습니다.
    let filterName = e.target.dataset.value;

    filterDress(dresses, filterSubject, filterName);
}

function addFilterEventListener(filter) {
  // 필터 이벤트를 추가하는 함수
  const filterList = document.querySelector('.filter-list');
  filterList.addEventListener('click', filter); // 필터 함수를 따로 뺐습니다.
}

function createHTML(item) { // html로 만드는 함수.
    const { gender, size, image } = item;
    return `<li><img src="${image}"/><span>${gender},${size}</span></li>`
}
function renderList(dresses) {
  // 옷들을 그리는 함수
  const dressList = document.querySelector('.dress-list');


  dressList.innerHTML = dresses.map((item) => createHTML(item)).join('');
  // while을 통해 자식을 다 지우고, 다시 하나하나 추가하는 식으로 했었는데, map을 통해 h
  // html을 만들고 .join을 통해 문자열로 합친 다음에 html에 넣어주었다. 그러면 잘 적용된다!!
}

function addLogoEventListener(renderAll) {
    // 로고를 눌렀을 시 전체 리스트를 보여줌.
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', renderAll);
  }

async function init() {
  let dresses = await loadData();
  const renderAll = () => renderList(dresses);
  addFilterEventListener(filter(dresses));
  addLogoEventListener(renderAll);
  renderAll();
}

init();
