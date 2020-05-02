'use strict';
const dressList = document.querySelector('.dress-list');
let dresses;

async function loadData() { // json 파일로부터 데이터를 받아 오는 함수.
    const response = await fetch('./data.json');
    const data = await response.json();
    dresses = data.dress;
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
    while(dressList.hasChildNodes()){
        dressList.removeChild(dressList.firstChild);
    }

    dresses.forEach((dress) => {
        const {gender, kinds, color, image} = dress;
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = image;
        const span = document.createElement('span');
        span.innerText = `${gender}, ${kinds}, ${color}`;
        li.appendChild(img);
        li.appendChild(span);
        dressList.appendChild(li);
    });
}


async function init() { 
    await loadData();
    addFilterEvent(dresses);
    renderList(dresses);
}

init();