const submit = document.getElementById('sub');
const clear = document.getElementById('cl');
const on = document.getElementById('on');
const off = document.getElementById('off');



document.getElementById("er").style.visibility = "hidden";
document.getElementById("on").style.visibility = "hidden";
document.getElementById("off").style.visibility = "hidden";
document.getElementById("cl").style.visibility = "hidden";
document.getElementById("Dcan").style.visibility = "hidden";
document.getElementById('h2').style.visibility = 'hidden';
document.getElementById('colorPicker').style.visibility = 'hidden';







function makeGrid(e){

      document.getElementById("er").style.visibility = "visible";
      document.getElementById("on").style.visibility = "visible";
      document.getElementById("off").style.visibility = "visible";
      document.getElementById("cl").style.visibility = "visible";
      document.getElementById("Dcan").style.visibility = "visible";
      document.getElementById('h2').style.visibility = 'visible';
      document.getElementById('colorPicker').style.visibility = 'visible';


      const height = document.getElementById('inputHeight').value;
      const width = document.getElementById('inputWidth').value;
      const table = document.getElementById('pixelCanvas');
      const heading = document.getElementById('EraseHeading');
      const pixelHeight = document.getElementById('PixelHeight').value;
      const pixelWidth = document.getElementById('PixelWidth').value;


     heading.innerHTML='';
     table.innerHTML = '';
     var isDragging = false;

//########################################################################################################

    for (var i=0; i<height; i++){
        const tr = document.createElement('tr');
        tr.style.backgroundColor = "white";
        tr.style.height = pixelHeight.toString().concat('px');
        tr.style.width = pixelWidth.toString().concat('px');
        table.appendChild(tr);
        for(var a=0; a<width; a++){
          const td = document.createElement('td');
          td.style.cursor = "url('images/pen.png'),auto";
          td.style.height = pixelHeight.toString().concat('px');
          td.style.width = pixelWidth.toString().concat('px');
          tr.appendChild(td);}}

//#######################################################################################################

          table.scrollIntoView();
          var test = document.querySelectorAll('td');
          var cellColor = '';
          for(let y=0;y<test.length;y++){

            function makeRed(){  cellColor=test[y].style.backgroundColor; test[y].style.backgroundColor = document.getElementById('colorPicker').value };
            function makeWhite(){ test[y].style.backgroundColor = cellColor};
            function makeColor() {if(isDragging){test[y].style.backgroundColor = document.getElementById('colorPicker').value;test[y].removeEventListener('mouseover',makeRed);test[y].removeEventListener('mouseout',makeWhite)}};
            function clickDraw() {test[y].style.backgroundColor=document.getElementById('colorPicker').value;test[y].removeEventListener('mouseover',makeRed);test[y].removeEventListener('mouseout',makeWhite)};

            function erase(){

              heading.textContent='isON';
              heading.style.color = '#99FF66';
              test[y].style.cursor = "url('images/eraser.png'),auto";
              test[y].removeEventListener('mouseover',makeRed);
              test[y].removeEventListener('mouseout',makeWhite);
              test[y].removeEventListener('click',clickDraw);

              test[y].addEventListener('click',()=>{test[y].style.backgroundColor='white'});
              test[y].addEventListener('mousedown',()=>{isDragging = true});
              test[y].addEventListener('mouseup',()=>{isDragging = false});
              test[y].addEventListener('mousemove',makeColor);

              function makeColor() {if(isDragging){test[y].style.backgroundColor = 'white';
              if(pixelHeight&&pixelWidth<9){
                test[y-1].style.backgroundColor = 'white';test[y+1].style.backgroundColor = 'white';test[y-width].style.backgroundColor = 'white';test[y+parseInt(width)].style.backgroundColor = 'white';
              }

            }}};

            function unerase(){

              heading.textContent='isOFF';
              heading.style.color = 'red';
              test[y].style.cursor = "url('images/pen.png'),auto";



                test[y].addEventListener('mouseover',makeRed);
                test[y].addEventListener('mouseout', makeWhite);
                test[y].addEventListener('click',clickDraw);
                test[y].addEventListener('mousedown',()=>{isDragging = true});
                test[y].addEventListener('mouseup',()=>{isDragging = false});
                test[y].addEventListener('mousemove',makeColor);


                function makeColor() {if(isDragging){test[y].style.backgroundColor = document.getElementById('colorPicker').value}};
            }

            test[y].addEventListener('mouseover',makeRed);
            test[y].addEventListener('mouseout', makeWhite);
            test[y].addEventListener('click',clickDraw);
            test[y].addEventListener('mousedown',()=>{isDragging=true});
            test[y].addEventListener('mouseup',()=>{ isDragging = false });
            test[y].addEventListener('mousemove',makeColor);

            on.addEventListener('click',erase);
            off.addEventListener('click',unerase);

          }

          e.preventDefault();
}




clear.addEventListener('click', makeGrid);
submit.addEventListener('click', makeGrid);
