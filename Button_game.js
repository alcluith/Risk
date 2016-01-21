    var _canvas = null;
    var _canvasContext = null;
    
    var _interval = null;
    var _recorded = false;
    var _attemptCounter = 1;

    var _green_test = false;
    var _green_interval = 1000;
    var _green_on = true;
    var _green_pushed = false;

    var _yellow_test = false;
    var _yellow_interval = 750;
    var _yellow_on = false;
    var _yellow_pushed = false;

    var _red_test = false;
    var _red_interval = 500;
    var _red_on = false;
    var _red_pushed = false;

    var _banked_points = 0;
    var _round_points = 0;
    var _round_number = 1;
    var _max_rounds = 5;



  function init() {
        if (_interval != null) {
            _interval = clearInterval(_interval);
        }
        /* draw in all the circles 'unlit' */
        if (_canvas && _canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            var x = 100;
            var y = 100;
             _canvasContext.fillStyle = 'rgb(127,0,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
          
           y = 200;
          
           _canvasContext.fillStyle = 'rgb(127,127,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
          
          y = 300;
            _canvasContext.fillStyle = 'rgb(0,127,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();

           /*red points text*/
            _canvasContext.textAlign = "right";
            _canvasContext.textBaseline = "top";
            _canvasContext.fillText("100 points", 200, 100);
            /*yellow points text*/
           _canvasContext.textAlign = "right";
            _canvasContext.textBaseline = "top";
            _canvasContext.fillText("50 points", 200,200);
            /*green points text*/
           _canvasContext.textAlign = "right";
            _canvasContext.textBaseline = "top";
            _canvasContext.fillText("10 points", 200,300);

            
        }
    }

    
function reset() {
            // reset variables (for subsequent games)
             _green_test = false;
             _green_on = true;
             _green_pushed = false;

             _yellow_test = false;
             _yellow_on = false;
             _yellow_pushed = false;

             _red_test = false;
             _red_on = false;
             _red_pushed = false;

             _banked_points = 0;
             _round_points = 0;
             _round_number = 1;
            
}


 /*triggered when someone clicks a 'light' */
    function stop() 
    {
      // alert('in stoplight');

      if (_green_test == true )
        {  /*if we're trying to hit the green button just now */
          if (_green_on == true)
            {
          
                     /*'unlight' green button */
              _interval = clearInterval(_interval);
              _canvasContext.fillStyle = 'rgb(0,127,0)';
              _canvasContext.beginPath();
              _canvasContext.arc(100, 300, 40, 0, Math.PI * 2, true);
              _canvasContext.closePath();
              _canvasContext.stroke();
              _canvasContext.fill();
              _green_test = false;
               /*set off yellow button*/
              _yellow_test = true;
              _yellow_on = true;
              _round_points  +=10;
              $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
               
              call_yellow();
            } 
          else 
            {
              alert('Points all lost!');
                _round_points = 0;
               
              //   $('#tblResults .banked:nth-child(4)').text(_round_points);
              $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
               _round_number += 1;
                next();
            }
        } /*end of green button section */
          else if (_yellow_test == true )
            {  /*if we're trying to hit the yellow button just now */
              if (_yellow_on == true) /*if yellow currently lit */
              {
                // alert('Yellow hit');
                   /*'unlight' yellow button */
                _interval = clearInterval(_interval);
                _canvasContext.fillStyle = 'rgb(127,127,0)';
                _canvasContext.beginPath();
                _canvasContext.arc(100, 200, 40, 0, Math.PI * 2, true);
                _canvasContext.closePath();
                _canvasContext.stroke();
                _canvasContext.fill();
                _yellow_test = false;
                 /*set off yellow button*/
                _red_test = false;
                _red_on = true;
                _red_test = true;
                _round_points  +=50;
              $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
              
                // alert('calling red')
                call_red();

              } 
              else 
              {
                
                alert('Points all lost!');
                _round_points = 0;
                $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
              
                _round_number += 1;
                
                next();
              }
            }/*end of yellow button section */
     else{           
           /*if we're trying to hit the red button just now */
              if (_red_on == true) /*if red currently lit */
              {
                // alert('Red hit');
                   /*'unlight' red button */
                _interval = clearInterval(_interval);
                _canvasContext.fillStyle = 'rgb(127,127,0)';
                _canvasContext.beginPath();
                _canvasContext.arc(100, 200, 40, 0, Math.PI * 2, true);
                _canvasContext.closePath();
                _canvasContext.stroke();
                _canvasContext.fill();
                _yellow_test = false;
                 /*set off red button*/
                _red_test = false;
               _round_points  +=100;
               // _banked_points += _round_points;
              $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
              // $('#tblResults .banked:nth-child(4)').text(_banked_points);
                // alert('Well done! Points banked! Next round!');
                 bank();
                // restart();
              } 
              else 
              {
               alert('Points all lost!');
                _round_points = 0;
               
                $('#tblResults .result:nth-child(' + _round_number + ')').text(_round_points);
                 _round_number = _round_number + 1;

                next();
              }
            }/*end of red button section */
        }
 
 

function call_green() {
     // alert('in call_green')
     if (_green_pushed == false){
     _green_test =true;
     _interval = setInterval(green, _green_interval);
     

  }
 }
 
  function green() 
    {
      if (_canvas && _canvas.getContext) 
      {
        _canvasContext = _canvas.getContext('2d');
         x=100;
         y=300;
         if (_green_on == false) 
         {
         /* 'light' green */
            _canvasContext.fillStyle = 'rgb(0,255,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
            _green_on = !_green_on;
             }
        else 
          {
          /*'unlight' green button */
            _canvasContext.fillStyle = 'rgb(0,127,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
            _green_on = !_green_on;
          }  
        }
     }

function call_yellow() {
  // alert('in call_yellow');
     if (_yellow_pushed == false){
      _yellow_test = true;
     _interval = setInterval(yellow, _yellow_interval);

  }
 }

function yellow() {
        // alert('in yellow');
        if (_canvas && _canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            var x = 100;
            var y = 200;
            if (_yellow_on == false) {
               /* 'light' yellow */
              _canvasContext.strokeStyle = 'rgb(0,0,0)';
              _canvasContext.fillStyle = 'rgb(255,255,0)';
              _canvasContext.beginPath();
              _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
              _canvasContext.closePath();
              _canvasContext.stroke();
              _canvasContext.fill();
              _yellow_on = !_yellow_on;
            }
            else{
                /* 'unlight' yellow */
            _canvasContext.fillStyle = 'rgb(127,127,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
            _yellow_on = !_yellow_on;
             }
      
    }
}

function call_red() {
     if (_red_pushed == false){
      _red_test = true;
     _interval = setInterval(red, _red_interval);
}
}

    function red() 
    {
        if (_canvas && _canvas.getContext) 
       
        {
            _canvasContext = _canvas.getContext('2d');
            var x = 100;
            var y = 100;
            
            /*'light up' red button */
             if (_red_on == false) {
            _canvasContext.strokeStyle = 'rgb(0,0,0)';
            _canvasContext.fillStyle = 'rgb(255,0,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(100, 100, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
            _red_on = !_red_on;
          }
             /*'unlight' red button */
            else{
            _canvasContext.fillStyle = 'rgb(127,0,0)';
            _canvasContext.beginPath();
            _canvasContext.arc(x, y, 40, 0, Math.PI * 2, true);
            _canvasContext.closePath();
            _canvasContext.stroke();
            _canvasContext.fill();
            _red_on = !_red_on;
          }
        }
         
    }

      function start() {
        _recorded = false;
        $('#restartButton').text('New Game');
        $('#restartButton').unbind('click');
        $('#restartButton').click(restart);
        $('#restartButton').blur();
        $('#restartButton').hide();
        $('#bankButton').show();
        call_green();
    }        
    
    function next()
    {
      if (_round_number < 4){
      alert('Starting next round!');
      //put lights out for start of next round
      init();
      call_green();
      }
      else{
         alert('Game over!');
         //put lights out for start of next round
         init();
         //reset all variables for new game
         reset();
         $('#restartButton').show();
         $('#bankButton').hide();
      }
    }

    function bank()
    {
      _banked_points += _round_points;
      $('#tblResults .banked:nth-child(4)').text(_banked_points);
      _round_number += 1;
      _round_points = 0;
      next();


    }

    $(document).ready(function () {
        _canvas = document.getElementById('myCanvas');
        $(document).keypress(stop);
        $('#myCanvas').click(stop);
        $('#restartButton').click(start);
        $('#bankButton').click(bank);
        init();
    });

function restart() {
        _attemptCounter = 1;
        // $('#tblResults .result').text('');
        // $('#tblResults .average').text('');
            $('#tblResults .result:nth-child(1)').text('');
            $('#tblResults .result:nth-child(2)').text(''); 
            $('#tblResults .result:nth-child(3)').text('');
            $('#tblResults .banked:nth-child(4)').text('');
          
        init();
        start();
    }


    


