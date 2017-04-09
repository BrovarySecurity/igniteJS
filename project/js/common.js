 window.onload = function () {

     // СЛАЙДЕР
     function slider() {
         var sliders = document.getElementById("baner").getElementsByClassName("baner-item").length;
         var n = 0;

         function sec() {
             if (n < 0) {
                 n = sliders - 1
             } else if (n >= sliders) {
                 n = 0
             }
             console.log("Номер банера #" + n);
             add(n)
         }
         sec();

         function autoplay() {
             n++;
             sec()
         }

         // автоматическое показ слайдов
         var auto = window.setInterval(autoplay, 3000);

         // листаем вправо
         document.getElementById("baner").querySelector(".b-nav-left").onclick = function () {
             clearInterval(auto);
             n--;
             setTimeout(function () {
                 auto = window.setInterval(autoplay, 3000)
             }, 5000);
             return sec()
         }

         // листаем вправо
         document.getElementById("baner").querySelector(".b-nav-right").onclick = function () {
             clearInterval(auto);
             n++;
             setTimeout(function () {
                 auto = window.setInterval(autoplay, 3000)
             }, 5000);
             return sec()
         }

         function add(n) {
             var obj = document.getElementById("baner").getElementsByClassName("baner-item");
             for (i = 0; i < obj.length; i++) {
                 obj[i].classList.remove("show")
             }
             obj[n].classList.add("show")
         }
     }
     slider();

     // НАВИГАЦИЯ
     function goto() {
         document.onclick = function (e) {
             var target = e.target;
             var action = target.getAttribute('data-go');
             if (action) {
                 a = document.getElementById(action);
                 if (a) {
                     var to = a.offsetTop;
                     var currentScroll = window.scrollY;
                     console.log(to);
                     // вниз или вверх
                     var down = currentScroll < to;
                     var scr = setInterval(function () {
                         currentScroll = currentScroll + 10 * (down ? 1 : -1);
                         window.scrollTo(0, currentScroll);
                         if ((down && currentScroll > to) || (!down && currentScroll < to)) {
                             clearInterval(scr)
                         }
                     }, 2)
                 } else {
                     console.log("Не найден ID '" + action + "'")
                 }
             }
         }
     };
     goto();

     // ФИЛЬТР
     function filtr() {
         var tabs = document.getElementById("filtr").getElementsByClassName("let1");
         var nav = document.getElementById("filtr").getElementsByTagName("a");

         // навигация
         for (var i = 0; i < nav.length; i++) {
             nav[i].onclick = function () {
                 for (var i = 0; i < nav.length; i++) {
                     nav[i].classList.remove("active")
                 }
                 this.classList.add("active");

                 // элементы 
                 nava = this.getAttribute("data-filtre");
                 for (var j = 0; j < tabs.length; j++) {
                     chek = tabs[j].classList.contains(nava);
                     if (chek) {
                         tabs[j].style.opacity = "1"
                     } else if (nava == "all") {
                         tabs[j].style.opacity = "1"
                     } else {
                         tabs[j].style.opacity = "0"
                     }
                 }
             }
         }
     }
     filtr();

     // УВЕЛИЧЕНИЕ ИЗОБРАЖЕНИЙ
     function hover() {

         // нужен .hover
         var childs = document.getElementsByClassName("hover");
         var childElems = [];
         for (var i = 0; i < childs.length; i++) {
             if (childs[i].nodeType == 1) {
                 childElems.push(childs[i])
             }
         }
         for (var j = 0; j < childElems.length; j++) {
             childElems[j].onmouseover = function () {
                 this.style.width = this.width + "px";
                 this.style.width = this.width / 100 * 110 + "px"
             }
             childElems[j].onmouseout = function () {
                 this.style.width = ""
             }
         }
     }
     hover();

     // СЧЕТ ЧИСЕЛ
     var olso = true;
     document.addEventListener('scroll', function () {
         var wh = window.pageYOffset + window.innerHeight;
         var gh = document.getElementById("hdoit").offsetTop;
         if (wh > gh) {
             if (olso) {

                 // выполнение функции chet()
                 chet();
                 olso = false
             }
         }
     });

     function chet() {
         var a = document.getElementsByClassName("hdoit-t");
         for (var i = 0; i < a.length; i++) {
             var c = a[i];
             var b = a[i].innerHTML;
             printNumbersInterval(c, b);

             function printNumbersInterval(c, b) {
                 var i = 0;
                 var timerId = setInterval(function () {
                     if (i > b) {
                         i = b
                     }
                     c.innerHTML = parseInt(i);
                     if (i == b) clearInterval(timerId);
                     i += b / 300
                 }, 10)
             }
         }
     };

     // КОМАНДА 
     var can = true;
     document.addEventListener('scroll', function () {
         var wh = window.pageYOffset + window.innerHeight;
         var gh = document.getElementById("team-card").offsetTop;
         if (wh > gh) {
             if (can) {
                 var canvas = document.getElementsByTagName('canvas');
                 for (var i = 0; i < canvas.length; i++) {
                     progressBar(canvas[i])
                 }
                 can = false
             }
         }
     })

     // Круговая диграмма
     function progressBar(canvasId) {
         var degreesCall;
         var canvas = canvasId;
         var ctx = canvas.getContext('2d');
         var cWidth = canvas.width;
         var cHeight = canvas.height;
         var progressColor = '#ffe600';
         var circleColor = '#fff';
         var rawPerc = canvas.getAttribute('data-perc');
         var perc = parseInt(rawPerc);
         var degrees = 0;
         var endDegrees = (360 * perc) / 100;
         var lineWidth = 7;

         function getDegrees() {
             if (degrees < endDegrees) {
                 degrees++
             } else {
                 clearInterval(degreesCall)
             }
             drawProgressBar()
         }

         function drawProgressBar() {
             ctx.clearRect(0, 0, cWidth, cHeight);
             ctx.beginPath();
             ctx.strokeStyle = circleColor;
             ctx.lineWidth = lineWidth - 1;
             ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0, Math.PI * 2, false);
             ctx.stroke();
             var radians = 0;
             radians = degrees * Math.PI / 180;
             ctx.beginPath();
             ctx.strokeStyle = progressColor;
             ctx.lineWidth = lineWidth;
             ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
             ctx.stroke();
             ctx.fillStyle = progressColor;
             ctx.font = '300 30px Oswald';
             var outputTextPerc = Math.floor(degrees / 360 * 100) + '%';
             var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
             ctx.fillText(outputTextPerc, cWidth / 2 - outputTextPercWidth / 2, cHeight / 2 + 10)
         }
         degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees))
     }

     function team() {
         var a = document.getElementsByClassName("team-j");
         var b = document.getElementsByClassName("team-card-j");
         var c = document.getElementsByClassName("t-close");
         for (var i = 0; i < a.length; i++) {
             a[i].addEventListener('click', function () {
                 for (var j = 0; j < b.length; j++) {

                     // треугольник
                     a[j].classList.remove("go");

                     // карточка
                     b[j].classList.remove("show");
                     if (this == a[j]) {
                         b[j].classList.add("show");
                         this.classList.add("go");
                     }
                 }
             })
         }
         // крестик
         for (var g = 0; g < c.length; g++) {
             c[g].addEventListener('click', function () {
                 for (var k = 0; k < b.length; k++) {
                     b[k].classList.remove("show");
                     a[k].classList.remove("go");
                 }
             })
         }
     }
     team();

     // ВАЛИДАЦИЯ ФОРМЫ  
     function valid() {
         var a = document.getElementsByClassName("valid");
         for (var i = 0; i < a.length; i++) {
             a[i].onkeyup = function (e) {
                 var d = this.value;
                 var b = this.nextElementSibling;
                 var c = this.getAttribute('data-valid');
                 var r;

                 // выбор рег выражения в зависимости от data-valid
                 switch (c) {
                 case "name":
                     r = /^[a-z]*$/i;
                     break;
                 case "mail":
                     r = /^[0-9a-z_@.]*$/i;
                     break;
                 case "subject":
                     r = /^[0-9a-z]*$/i;
                     break;
                 default:
                     console.log("Valid error" + c)
                 }
                 if (!r.test(d)) {
                     b.classList.add("show")
                 } else {
                     b.classList.remove("show")
                 }
             }
         }
     }
     valid();

     // КАРУСЕЛЬ
     function car() {
         var a = document.getElementsByClassName("car-box");
         var b = document.querySelector(".car-nav");
         var d = document.getElementsByClassName("car-boxik");
         for (var i = 0; i < a.length; i++) {
             var div = document.createElement('div');
             div.className = "car-boxik";
             b.appendChild(div);
             d[i].onclick = function (e) {
                 for (var j = 0; j < d.length; j++) {
                     d[j].classList.remove("car-active");
                     a[j].classList.remove("show");
                     if (this == d[j]) {
                         d[j].classList.add("car-active");
                         a[j].classList.add("show");
                     }
                 }

             }
         }
         d[0].classList.add("car-active");


     }
     car();
 }