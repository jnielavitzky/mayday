var clicks = 2;
    function onClickUP() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };

    function onClickDOWN() {
        if(clicks > 0) {
            clicks -= 1;
            document.getElementById("clicks").innerHTML = clicks;
        }
    };
