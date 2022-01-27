// drag n drop


let mainPush = document.getElementById('mainPush');

function getInfo() {
    event.preventDefault();
    let mainText    = document.getElementById('mainText').value;
    let mainNumber  = document.getElementById('mainNumber').value;
    let out         = document.getElementById('out');

    console.log(out);

    let buttonDelete = document.createElement('BUTTON');
        buttonDelete.className = 'mainBlockButton';
        buttonDelete.innerHTML = "Выполнено!"
        buttonDelete.setAttribute('data-del', 'delete');

    let outBlock = document.createElement('div');
        outBlock.className = 'mainBlock';
        outBlock.innerHTML += '<h2>'+mainText+'</h2>';
        outBlock.innerHTML += '<p>'+mainNumber+'</p>';
        outBlock.appendChild(buttonDelete);
        out.appendChild(outBlock);


        // buttonDelete.addEventListener('click', function () {
        //     console.log(this);
        //     //this.remove();
        // }, false);

    const tasksListElement = document.getElementById(`out`);
    const taskElements = tasksListElement.querySelectorAll(`.mainBlock`);

// Перебираем все элементы списка и присваиваем нужное значение
    for (const task of taskElements) {
        task.draggable = true;
    }

    tasksListElement.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
    })

    tasksListElement.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
    });

    tasksListElement.addEventListener(`dragover`, (evt) => {
        // Разрешаем сбрасывать элементы в эту область
        evt.preventDefault();

        // Находим перемещаемый элемент
        const activeElement = tasksListElement.querySelector(`.selected`);
        // Находим элемент, над которым в данный момент находится курсор
        const currentElement = evt.target;
        // Проверяем, что событие сработало:
        // 1. не на том элементе, который мы перемещаем,
        // 2. именно на элементе списка
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`mainBlock`);

        // Если нет, прерываем выполнение функции
        if (!isMoveable) {
            return;
        }

        // Находим элемент, перед которым будем вставлять
        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        // Вставляем activeElement перед nextElement
        tasksListElement.insertBefore(activeElement, nextElement);
    });

    const getNextElement = (cursorPosition, currentElement) => {
        // Получаем объект с размерами и координатами
        const currentElementCoord = currentElement.getBoundingClientRect();
        // Находим вертикальную координату центра текущего элемента
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        // Если курсор выше центра элемента, возвращаем текущий элемент
        // В ином случае — следующий DOM-элемент
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    };
    tasksListElement.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();

        const activeElement = tasksListElement.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`mainBlock`);

        if (!isMoveable) {
            return;
        }

        // evt.clientY — вертикальная координата курсора в момент,
        // когда сработало событие
        const nextElement = getNextElement(evt.clientY, currentElement);

        // Проверяем, нужно ли менять элементы местами
        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
            return;
        }

        tasksListElement.insertBefore(activeElement, nextElement);
    });

}

mainPush.addEventListener('click', getInfo, false);

function removeElem(delElem, attribute, attributeName) {
//проверка на наличие всех аргументов.
    if (!(delElem && attribute && attributeName)) return;
//возвращаем функцию, которая будет иметь доступ к аргументам, и при этом будет в себе хранить объект события.
    return function(e) {
        //Узнаем на каком элементе был произведен клик.
        let target = e.target;
//Делаем проверку на наличие атрибута "data-del", и проверяем на наличие параметра "delete".
        if (!(target.hasAttribute(attribute) ?
            (target.getAttribute(attribute) === attributeName ? true : false) : false)) return;
        let elem = target;
//После мы производим поиск элемента, который нужно удалить. Поиск идет снизу вверх. За счет того, что кнопки находяться внутри "card", то мы точно удалить нужный нам "card"(сорри за тавтологию).
        while (target != this) {
            if (target.classList.contains(delElem)) {
                target.remove();
                return;
            }
            target = target.parentNode;
        }
        return;
    };
}


document.addEventListener("click", removeElem("mainBlock", "data-del", "delete"));

