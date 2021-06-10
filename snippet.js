console.clear();

var success = false;
var context = "/sugang";

function run(lec_nm, params, rowid, mode) {
    
    $.ajax({

        type: "POST",
        url: context + "/sugang?attribute=sugangMode&mode=" + mode + "&fake=" + new Date(),
        data: {
            params: params
        },
        async: false,
        success: function(data) {
            var tmp = eval("(" + data + ")");
            var code = tmp.code;
            var msg = tmp.msg;
            //NetFunnel_goComplete();
            if (code == "999") {
                //alert(tmp.msg);
                logout(tmp.msg);
            } else if (code == "300") {
                // 재수강신청
                var str = msg;
                var res = str.split("@");
                //alert(res[0]);
                //reTake(params, rowid, res[1]);
                console.log("재수강 신청 과목임")
            } else if (tmp.code == "MACRO") {
                console.log("MACRO")
            } else if (tmp.code == "200") {
                $("#retake").dialog();
                if ($("#retake").dialog("isOpen")) {
                    $("#retake").dialog("close");
                }
                console.log(tmp.msg);
                //msgAlert(tmp.msg);
                if (mode == "insert") {
                    $("#listSugang").trigger("reloadGrid");
                } else {
                    $("#listSugang").jqGrid('delRowData', rowid);
                    getCredit();
                }
                success = true;
            } else {
                //console.clear();
                console.log(tmp.msg);
                return;
            }
        },
        error: function(req, status, error) {
            alert("code:" + req.status + "\n" + "message:" + req.responseText + "\n" + "error:" + error);
        }
    });
}


// 인성
//run("GNU인성", "ZTA20003@01", "1", "insert");
// run("교육심리", "ZCA20003@04", "9", "insert");

// gnu 인성
run("미국탐방시리즈", "OFA00806@555", "4", "insert");
// run("창업길라잡이", "ZPA20015@01", "1", "insert");
// run("소셜이노베이션창업", "ZPA20008@01", "1", "insert");
