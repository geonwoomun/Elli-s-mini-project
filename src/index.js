'use strict';

function showAllList(dresses) { // 로고를 눌렀을 시 전체 리스트를 보여줌.
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        renderList(dresses);
    });    
}

async function loadData() { // json 파일로부터 데이터를 받아 오는 함수.
    const response = await fetch('./data.json');
    const data = await response.json();
    return data.dress;
}

function filterDress (dresses, filterSubject, filterName) { //옷을 필터하는 함수
    const filteredDresses = dresses.filter((dress) => dress[filterSubject] === filterName);
    renderList(filteredDresses);
}

function addFilterEvent(dresses) { // 필터 이벤트를 추가하는 함수
    const filterList = document.querySelector('.filter-list');
    filterList.addEventListener('click', (e) => {
        let filterSubject;
        let filterName;
        if (e.target.tagName === 'UL') {
            return;
        }
        if (e.target.tagName === "IMG") {
            filterSubject = e.target.parentNode.className;
            filterName = e.target.parentNode.id;
        }
        else {
            filterSubject = e.target.className;
            filterName = e.target.id;
        }
        filterDress(dresses, filterSubject, filterName);
    });
}

function renderList (dresses) { // 옷들을 그리는 함수
    const dressList = document.querySelector('.dress-list');
    
    while(dressList.hasChildNodes()){
        dressList.removeChild(dressList.firstChild);
    }

    dresses.forEach((dress) => {
        const { gender, size,image } = dress;
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = image;
        const span = document.createElement('span');
        span.innerText = `${gender}, ${size} size`;
        li.appendChild(img);
        li.appendChild(span);
        dressList.appendChild(li);
    });
}

async function init() { 
    let dresses = await loadData();
    addFilterEvent(dresses);
    showAllList(dresses);
    renderList(dresses);
}

init();