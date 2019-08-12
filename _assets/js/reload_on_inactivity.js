var idleTime = 0;

$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 30000); // 30 secs

    //Zero the idle timer on mouse movement.
    $('html').mousemove(function (e) {
      console.log("Mouse movement, resetting idle time...");
      idleTime = 0;
    });
    $('html').keydown(function (e) {
      console.log("Keypress, resetting idle time...");
      idleTime = 0;
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    console.log(idleTime)
    if (idleTime > 1) {
        window.location.reload();
    }
}