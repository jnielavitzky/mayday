var clicks_1 = 2;
var clicks_2 = 0;
var clicks_3 = 0;

    $(document).ready(function() {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy'
        });
    });

    $(".js-example-basic-single").select2();

    function onClickUP(item) {
        switch (item) {
            case 1:
                clicks_1 += 1;
                document.getElementById("clickmayores").innerHTML = clicks_1;
                break;

            case 2:
                clicks_2 += 1;
                document.getElementById("clickmenores").innerHTML = clicks_2;
                break;

            case 3:
                clicks_3 += 1;
                document.getElementById("clickinfantes").innerHTML = clicks_3;
                break;
        }
    };

    function onClickDOWN(item) {
        switch (item) {
            case 1:
                if(clicks_1 > 0) {
                    clicks_1 -= 1;
                    document.getElementById("clickmayores").innerHTML = clicks_1;
                }
                break;

            case 2:
                if(clicks_2 > 0) {
                    clicks_2 -= 1;
                    document.getElementById("clickmenores").innerHTML = clicks_2;
                }
                break;

            case 3:
                if(clicks_3 > 0) {
                    clicks_3 -= 1;
                    document.getElementById("clickinfantes").innerHTML = clicks_3;
                }
                break;
        }
    };
