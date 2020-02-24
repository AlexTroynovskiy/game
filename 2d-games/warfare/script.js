/* 
1.Сделать движения игрока в верх и вниз (верх и вниз) ++
2. Сделать выстрел с нажатием на пробел  ++
3. Cделать полет пули  ++
4. Cделать проверку попала ли пуля в цель в муху 
5. Если попали по мухе то сделать взрыв 
6. Удалять пулю когда она вышла за пределы игрового поля

 */
// Выбираем блок с игркоом
player = document.querySelector("#player");

// Количество жизней
lifes = 3;

// Добовляем события нажатия клавишы
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    // Нажали вниз(s)
    case 83:
      player.style.top = player.offsetTop + 80 + "px";
      break;
    //Нажали верх(w)
    case 87:
      player.style.top = player.offsetTop - 80 + "px";
      break;
    // Нажали пробел
    case 32:
      creatBullet();
      break;
  }
});

// Создание пули
function creatBullet() {
  // создаем блок для пули
  let bullet = document.createElement("div");
  // дем класс пули
  bullet.className = "bullet";
  // создаем начальное значение позиции пули
  bullet.style.top = player.offsetTop + 139 + "px";
  // добавляем пулю на игровое поле
  document.body.appendChild(bullet);
  bulletMove(bullet);
}
creatEnemy();

// движение пули

function bulletMove(bullet) {
  // создаем таймер для движение пули
  let timerId = setInterval(function() {
    // двигаем пуляю вправо
    bullet.style.left = bullet.offsetLeft + 10 + "px";
    // проверяем попала ли пуля в мишень
    isShot(bullet, timerId);

    if (bullet.offsetLeft > document.body.clientWidth) {
      bullet.remove();
      clearInterval(timerId);
    }
  }, 10);
}

function isShot(bullet, timerId) {
  // Кординаты вырехней и нижней точки пули
  let topB = bullet.offsetTop;
  let bottomB = bullet.offsetTop + bullet.offsetHeight;
  let leftB = bullet.offsetLeft;

  let enemy = document.querySelector(".enemy");

  if (enemy != null) {
    // Кординаты верхней нижней точки нашего врага
    let topE = enemy.offsetTop;
    let bottomE = enemy.offsetTop + enemy.offsetHeight;
    let leftE = enemy.offsetLeft;

    if (topB >= topE && topB <= bottomE && leftB >= leftE) {
      enemy.className = "boom";
      enemy.style.top = topE - 50 + "px";
      enemy.style.left = leftE - 50 + "px";
      clearInterval(enemy.dataset.timerId);
      setTimeout(function() {
        enemy.remove();
        creatEnemy();
        clearInterval(timerId);
        bullet.remove();
      }, 1000);
    }
  }
}

function isDie() {
  let enemy = document.querySelector(".enemy");

  if (
    enemy.offsetTop > player.offsetTop &&
    enemy.offsetTop < player.offsetTop + player.offsetHeight &&
    enemy.offsetLeft <= player.offsetLeft + player.offsetWidth
  ) {
    enemy.className = "boom";
    enemy.style.top = player.offsetTop + 50 + "px";
    enemy.style.left = player.offsetLeft + 50 + "px";
    clearInterval(enemy.dataset.timerId);
    setTimeout(function() {
      enemy.remove();
      creatEnemy();
    }, 500);
    die();
  }
}

// Cоздания врага

function creatEnemy() {
  let enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.top = randomInteger(200, document.body.offsetHeight - 100) + "px";
  document.body.appendChild(enemy);

  let timerId = setInterval(function() {
    enemy.style.left = enemy.offsetLeft - 10 + "px";
    if (enemy.offsetLeft + enemy.offsetWidth < 0) {
      enemy.remove();
      clearInterval(timerId);
      creatEnemy();
      // отнимаем жизни
      die();
    }
    isDie();
  }, 100);
  enemy.dataset.timerId = timerId;
}

function die() {
  lifes--;
  if (lifes != 0) {
    let lifesBlock = document.querySelector("#lifes");
    let life = lifesBlock.querySelector("span");
    life.remove();
  } else {
    endGame();
  }
}

function endGame() {
  document.body.innerHTML = "";
  alert("Game over");
}

// Получить случайное число от min до max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
