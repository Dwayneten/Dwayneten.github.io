function Question(id, ans) {
    this.id = id;
    this.ans = ans;
}
Question.prototype = {
    construtor: Question
}
// store question's id and its answer
var questionList = [];
// get the document from the inside iframe
var frDoc = document.getElementById('_fr').contentDocument;
// image list (question title)
var imgList = frDoc.getElementsByTagName('img');
// radio list 
var ddList = frDoc.getElementsByTagName('dd');
// a flag for judge is it an submited homework or not
var judAns = 0;
// a flag for judge is it an empty homework or not
var judScan = 0;
var Exam_xinli = 0;
var Exam_luoji = 0;

// fetching the question list
// if judAns == 1 then fetch from the unsubmit homework
// else if judScan == 1 then fetch from the empty homework
// else fetch from the submited homework
function getQuestionList() {
	// init
    questionList = [];
    frDoc = document.getElementById('_fr').contentDocument;
    imgList = frDoc.getElementsByTagName('img');
    ddList = frDoc.getElementsByTagName('dd');

    // fetch from unsubmit homework
    if (judAns == 1) {
		// fetch ans for the unmatch result
        ddList = [];
        ddList = frDoc.getElementsByClassName("noansdd");
        imgList = [];
        imgList = frDoc.getElementsByClassName("noansimg");

        for (i=0; i<ddList.length; i++) {
            if (ddList[i].children[0].nodeName == "UL") {
				// selection type
                for (j=0; j<4; j++) {
                    if (ddList[i].children[0].children[j].children[0].checked == true) {
                        questionList.push(new Question(imgList[i].src.split('=')[1], j + 1));
                        break;
                    }
                }
            } else if (ddList[i].children[0].nodeName == "LABEL") {
				// judge type
                if (ddList[i].children[0].children[0].checked == true) {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                } else {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                }
            } else {
				// error
                alert('ddList[' + i + '].children[0].nodeName do not match.')
                break;
            }
        }
        return;
    }
    // fetch from empty homework
    if (judScan == 1) {
        for (i=0; i<ddList.length; i++) {
			// mark the questions
            ddList[i].className += "noansdd";
            imgList[i].className += "noansimg";
			// set the answer to 5 becouse of no answer here for an empty homework
            if (ddList[i].children[0].nodeName == "UL") {
                questionList.push(new Question(imgList[i].src.split('=')[1], 5));
            } else if (ddList[i].children[0].nodeName == "LABEL") {
                questionList.push(new Question(imgList[i].src.split('=')[1], 5));
            } else {
                alert('ddList[' + i + '].children[0].nodeName do not match.')
                break;
            }
        }
        return;
    }
    // fetch from submited homework
    for (i=0; i<ddList.length; i++) {
        if (ddList[i].children[0].nodeName == "UL") {
			// selection type
			// if the answer incorret then fetch from the tips
            if (ddList[i].children.length > 1) {
                var tmp = 0;
                switch (ddList[i].children[1].innerText.split(' ')[1]) {
                    case "A":
                        tmp = 1;
                        break;
                    case "B":
                        tmp = 2;
                        break;
                    case "C":
                        tmp = 3;
                        break;
                    case "D":
                        tmp = 4;
                        break;
                    default:
                        alert('ddList[' + i + '].children[1].innerText do not match.');
                        return;
                }
                questionList.push(new Question(imgList[i].src.split('=')[1], tmp));
                continue;
            }
			// if the anser corret then fetch from the selected answer
            for (j=0; j<4; j++) {
                if (ddList[i].children[0].children[j].className.split(' ')[1] == "correct") {
                    questionList.push(new Question(imgList[i].src.split('=')[1], j + 1));
                    break;
                }
            }
        } else if (ddList[i].children[0].nodeName == "LABEL") {
			// radio type
            if (ddList[i].children[0].className == "checked") {
				// if first button selected
                if (ddList[i].children[2].className == "falseIcon") {
					// if its wrong answer
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                } else {
					// if its correct answer
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                }
            } else {
				// if second button selected
                if (ddList[i].children[2].className == "falseIcon") {
					// if its wrong answer
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                } else {
					// if its correct answer
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                }
            }
        } else {
			// error
            alert('ddList[' + i + '].children[0].nodeName do not match.')
            break;
        }
    }
}

// function for loading CSS
function loadStyleString(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}


// question and answers database here
var cssLayout = '.mybox{width: 240px;min-height: 70px;border: 1px solid #ccc;box-shadow: 0 0 8px 1px #999;position: fixed;z-index: 10;margin: 0;left: 10px;background-color: #fcfcfc;font-family: "Microsoft Jhenghei","Hiragino Sans GB","Helvetica Neue","Helvetica","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;font-size: 1.2em;}#tipbox{bottom: 10px;}#jsonbox{top: 10px;}#devbox{bottom: 120px;}.btn{margin: 20px 20px 10px 20px;background-color: #289fff;text-decoration: none;display: inline-block;width: 80px;line-height: 30px;text-align: center;color: #fff;}.btn:hover{text-decoration: none;color: #fff;text-shadow: #86ffff 0 0 5px;line-height: 30px;}.centerText{text-align: center;}';
var xinli1Json = '[{"id":"192547","ans":2},{"id":"192559","ans":3},{"id":"192551","ans":4},{"id":"192545","ans":4},{"id":"192575","ans":3},{"id":"192543","ans":3},{"id":"192573","ans":2},{"id":"192553","ans":1},{"id":"192541","ans":1},{"id":"192549","ans":2},{"id":"192539","ans":1},{"id":"192557","ans":1},{"id":"192531","ans":1},{"id":"192535","ans":1},{"id":"192561","ans":1},{"id":"192565","ans":1},{"id":"192577","ans":1},{"id":"192563","ans":1},{"id":"192555","ans":1},{"id":"192569","ans":1},{"id":"192571","ans":3},{"id":"192567","ans":2},{"id":"192533","ans":1},{"id":"192537","ans":1}]';
var xinli2Json = '[{"id":"192669","ans":4},{"id":"192667","ans":3},{"id":"192665","ans":3},{"id":"192701","ans":2},{"id":"192663","ans":2},{"id":"192673","ans":1},{"id":"192689","ans":1},{"id":"192697","ans":1},{"id":"192675","ans":2},{"id":"192687","ans":1},{"id":"192683","ans":1},{"id":"192671","ans":2},{"id":"192679","ans":1},{"id":"192699","ans":1},{"id":"192693","ans":2},{"id":"192677","ans":1},{"id":"192685","ans":2},{"id":"192691","ans":2},{"id":"192681","ans":1},{"id":"192695","ans":1}]';
var xinli3Json = '[{"id":"192825","ans":2},{"id":"192823","ans":1},{"id":"192819","ans":2},{"id":"192821","ans":1},{"id":"192829","ans":1},{"id":"192827","ans":2},{"id":"192831","ans":1},{"id":"192817","ans":1},{"id":"192815","ans":1}]';
var xinlikaoshi = '[{"id":"192547","ans":2},{"id":"192559","ans":3},{"id":"192551","ans":4},{"id":"192545","ans":4},{"id":"192575","ans":3},{"id":"192543","ans":3},{"id":"192573","ans":2},{"id":"192553","ans":1},{"id":"192541","ans":1},{"id":"192549","ans":2},{"id":"192539","ans":1},{"id":"192557","ans":1},{"id":"192531","ans":1},{"id":"192535","ans":1},{"id":"192561","ans":1},{"id":"192565","ans":1},{"id":"192577","ans":1},{"id":"192563","ans":1},{"id":"192555","ans":1},{"id":"192569","ans":1},{"id":"192571","ans":3},{"id":"192567","ans":2},{"id":"192533","ans":1},{"id":"192537","ans":1},{"id":"192669","ans":4},{"id":"192667","ans":3},{"id":"192665","ans":3},{"id":"192701","ans":2},{"id":"192663","ans":2},{"id":"192673","ans":1},{"id":"192689","ans":1},{"id":"192697","ans":1},{"id":"192675","ans":2},{"id":"192687","ans":1},{"id":"192683","ans":1},{"id":"192671","ans":2},{"id":"192679","ans":1},{"id":"192699","ans":1},{"id":"192693","ans":2},{"id":"192677","ans":1},{"id":"192685","ans":2},{"id":"192691","ans":2},{"id":"192681","ans":1},{"id":"192695","ans":1},{"id":"192825","ans":2},{"id":"192823","ans":1},{"id":"192819","ans":2},{"id":"192821","ans":1},{"id":"192829","ans":1},{"id":"192827","ans":2},{"id":"192831","ans":1},{"id":"192817","ans":1},{"id":"192815","ans":1},{"id":"193199","ans":1},{"id":"192845","ans":2},{"id":"192907","ans":3},{"id":"193175","ans":3},{"id":"193167","ans":2},{"id":"192901","ans":3},{"id":"192741","ans":3},{"id":"192515","ans":3},{"id":"192601","ans":1},{"id":"193101","ans":2},{"id":"192523","ans":2},{"id":"193187","ans":4},{"id":"193163","ans":4},{"id":"193185","ans":3},{"id":"193169","ans":3},{"id":"192905","ans":4},{"id":"193195","ans":3},{"id":"192517","ans":3},{"id":"192881","ans":2},{"id":"193095","ans":3},{"id":"192519","ans":2},{"id":"193159","ans":2},{"id":"192897","ans":1},{"id":"193089","ans":3},{"id":"192643","ans":3},{"id":"192589","ans":2},{"id":"193037","ans":2},{"id":"192869","ans":2},{"id":"192621","ans":4},{"id":"193155","ans":4},{"id":"192765","ans":2},{"id":"193221","ans":2},{"id":"192603","ans":3},{"id":"193211","ans":2},{"id":"192587","ans":4},{"id":"193025","ans":1},{"id":"193209","ans":4},{"id":"192641","ans":4},{"id":"192865","ans":3},{"id":"192617","ans":1},{"id":"193213","ans":3},{"id":"192735","ans":4},{"id":"192613","ans":4},{"id":"192983","ans":1},{"id":"192875","ans":1},{"id":"193087","ans":2},{"id":"192943","ans":1},{"id":"192871","ans":1},{"id":"192935","ans":1},{"id":"193129","ans":1},{"id":"192963","ans":2},{"id":"193227","ans":1},{"id":"192853","ans":1},{"id":"192659","ans":2},{"id":"193231","ans":2},{"id":"192733","ans":1},{"id":"193029","ans":2},{"id":"192605","ans":1},{"id":"192973","ans":1},{"id":"193223","ans":1},{"id":"192747","ans":1},{"id":"192961","ans":1},{"id":"192763","ans":1},{"id":"192979","ans":1},{"id":"192877","ans":1},{"id":"192997","ans":1},{"id":"192801","ans":2},{"id":"193121","ans":1},{"id":"192521","ans":1},{"id":"193061","ans":1},{"id":"192729","ans":1},{"id":"192647","ans":3},{"id":"193115","ans":1},{"id":"192631","ans":2},{"id":"192609","ans":2},{"id":"192957","ans":2},{"id":"192585","ans":1},{"id":"192655","ans":1},{"id":"193077","ans":3},{"id":"193019","ans":3},{"id":"192581","ans":3},{"id":"192893","ans":1},{"id":"192661","ans":4},{"id":"193099","ans":2},{"id":"192903","ans":4},{"id":"192633","ans":3},{"id":"192803","ans":4},{"id":"192867","ans":2},{"id":"193197","ans":2},{"id":"193079","ans":3},{"id":"193017","ans":1},{"id":"192607","ans":4},{"id":"193033","ans":2},{"id":"193193","ans":2},{"id":"193093","ans":2},{"id":"192579","ans":1},{"id":"192591","ans":2},{"id":"192911","ans":1},{"id":"192753","ans":1},{"id":"193067","ans":1},{"id":"192757","ans":1},{"id":"192843","ans":1},{"id":"192839","ans":1},{"id":"192813","ans":1},{"id":"193119","ans":1},{"id":"192737","ans":2},{"id":"192785","ans":1},{"id":"192727","ans":1},{"id":"193007","ans":1},{"id":"193133","ans":1},{"id":"193063","ans":2},{"id":"192715","ans":1},{"id":"193201","ans":1},{"id":"193217","ans":1},{"id":"192639","ans":1},{"id":"192931","ans":1},{"id":"192863","ans":1},{"id":"193015","ans":1},{"id":"192887","ans":1},{"id":"193105","ans":1},{"id":"192967","ans":2},{"id":"192925","ans":2},{"id":"192707","ans":2},{"id":"192909","ans":1},{"id":"193009","ans":2},{"id":"192755","ans":2},{"id":"192749","ans":2},{"id":"192761","ans":1},{"id":"192951","ans":1},{"id":"192989","ans":1},{"id":"193141","ans":1},{"id":"192861","ans":1},{"id":"192859","ans":2},{"id":"192891","ans":3},{"id":"192781","ans":4},{"id":"193189","ans":1},{"id":"193191","ans":1},{"id":"193103","ans":4},{"id":"193181","ans":4},{"id":"192895","ans":2},{"id":"192899","ans":2},{"id":"193153","ans":3},{"id":"192593","ans":1},{"id":"193183","ans":3},{"id":"192615","ans":3},{"id":"193117","ans":2},{"id":"192709","ans":1},{"id":"193041","ans":1},{"id":"192599","ans":1},{"id":"192833","ans":1},{"id":"192771","ans":1},{"id":"192797","ans":1},{"id":"192635","ans":2},{"id":"192513","ans":1},{"id":"192619","ans":1},{"id":"192779","ans":1},{"id":"193065","ans":1},{"id":"192919","ans":1},{"id":"192511","ans":1},{"id":"193147","ans":1},{"id":"192745","ans":1},{"id":"192933","ans":1},{"id":"192723","ans":1},{"id":"193043","ans":1},{"id":"192627","ans":1},{"id":"193149","ans":2},{"id":"193013","ans":1},{"id":"192783","ans":2},{"id":"192939","ans":2},{"id":"193137","ans":2},{"id":"193047","ans":1},{"id":"192629","ans":2},{"id":"193113","ans":1},{"id":"192743","ans":4},{"id":"193097","ans":4},{"id":"193219","ans":4},{"id":"192725","ans":2},{"id":"192653","ans":1},{"id":"193235","ans":3},{"id":"193125","ans":1},{"id":"192721","ans":1},{"id":"193059","ans":1},{"id":"192759","ans":2},{"id":"193131","ans":2},{"id":"192849","ans":1},{"id":"192807","ans":1},{"id":"193215","ans":1},{"id":"192805","ans":1},{"id":"193145","ans":2},{"id":"192769","ans":1},{"id":"193179","ans":1},{"id":"193057","ans":2},{"id":"193135","ans":1},{"id":"192947","ans":2},{"id":"192985","ans":2},{"id":"193177","ans":1},{"id":"192651","ans":2},{"id":"192993","ans":2},{"id":"193085","ans":1},{"id":"192657","ans":2},{"id":"192999","ans":1},{"id":"192975","ans":1},{"id":"193165","ans":1},{"id":"193071","ans":1},{"id":"192775","ans":1},{"id":"192941","ans":2}, {"id":"193229","ans":3},{"id":"192971","ans":1},{"id":"192739","ans":2},{"id":"192915","ans":1},{"id":"192525","ans":1},{"id":"192705","ans":1},{"id":"192991","ans":1},{"id":"193123","ans":2},{"id":"193075","ans":1},{"id":"192731","ans":1},{"id":"192623","ans":1},{"id":"192711","ans":2},{"id":"193151","ans":1},{"id":"192529","ans":2},{"id":"193225","ans":1},{"id":"192795","ans":1},{"id":"192959","ans":1},{"id":"192719","ans":1},{"id":"192767","ans":2},{"id":"193001","ans":1},{"id":"192913","ans":2},{"id":"192995","ans":1},{"id":"193091","ans":1},{"id":"192611","ans":1},{"id":"192773","ans":2},{"id":"192837","ans":1},{"id":"192981","ans":2},{"id":"193239","ans":1},{"id":"193107","ans":2},{"id":"193111","ans":1},{"id":"192791","ans":1},{"id":"192851","ans":2},{"id":"192927","ans":2},{"id":"192527","ans":1},{"id":"192969","ans":2},{"id":"192873","ans":1},{"id":"192929","ans":2}]';
var luoji1Json = '[{"id":"147739","ans":4},{"id":"147725","ans":1},{"id":"147729","ans":1},{"id":"147709","ans":4},{"id":"147731","ans":3},{"id":"147713","ans":1},{"id":"147693","ans":2},{"id":"147697","ans":3},{"id":"147691","ans":4},{"id":"147751","ans":2},{"id":"147705","ans":2},{"id":"147703","ans":1},{"id":"147745","ans":1},{"id":"147735","ans":2},{"id":"147717","ans":1},{"id":"147719","ans":2},{"id":"147757","ans":1},{"id":"147759","ans":2},{"id":"147747","ans":2},{"id":"147733","ans":1},{"id":"147721","ans":4},{"id":"147701","ans":2},{"id":"147741","ans":1},{"id":"147755","ans":3},{"id":"147711","ans":3},{"id":"147723","ans":2},{"id":"147753","ans":1},{"id":"147727","ans":3},{"id":"147749","ans":4},{"id":"147699","ans":1}]';
var luoji2Json = '[{"id":"147913","ans":1},{"id":"147929","ans":4},{"id":"147945","ans":3},{"id":"147941","ans":4},{"id":"147923","ans":3},{"id":"147933","ans":1},{"id":"147905","ans":2},{"id":"147935","ans":3},{"id":"147911","ans":2},{"id":"147931","ans":2},{"id":"147915","ans":1},{"id":"147949","ans":2},{"id":"147937","ans":1},{"id":"147927","ans":2},{"id":"147907","ans":1},{"id":"147939","ans":2},{"id":"147925","ans":1},{"id":"147947","ans":1},{"id":"147909","ans":2},{"id":"147917","ans":2},{"id":"147903","ans":4},{"id":"147943","ans":2},{"id":"147919","ans":4},{"id":"147921","ans":1}]';
var luoji3Json = '[{"id":"148129","ans":4},{"id":"148119","ans":2},{"id":"148139","ans":4},{"id":"148109","ans":2},{"id":"148099","ans":2},{"id":"148151","ans":1},{"id":"148121","ans":4},{"id":"148097","ans":4},{"id":"148147","ans":4},{"id":"148149","ans":2},{"id":"148153","ans":1},{"id":"148113","ans":1},{"id":"148141","ans":1},{"id":"148115","ans":2},{"id":"148125","ans":1},{"id":"148107","ans":2},{"id":"148155","ans":2},{"id":"148105","ans":1},{"id":"148127","ans":2},{"id":"148143","ans":2},{"id":"148133","ans":1},{"id":"148103","ans":3},{"id":"148131","ans":2},{"id":"148101","ans":1},{"id":"148123","ans":3}]';
var luojikaoshi = '[{"id":"147739","ans":4},{"id":"147725","ans":1},{"id":"147729","ans":1},{"id":"147709","ans":4},{"id":"147731","ans":3},{"id":"147713","ans":1},{"id":"147693","ans":2},{"id":"147697","ans":3},{"id":"147691","ans":4},{"id":"147751","ans":2},{"id":"147705","ans":2},{"id":"147703","ans":1},{"id":"147745","ans":1},{"id":"147735","ans":2},{"id":"147717","ans":1},{"id":"147719","ans":2},{"id":"147757","ans":1},{"id":"147759","ans":2},{"id":"147747","ans":2},{"id":"147733","ans":1},{"id":"147721","ans":4},{"id":"147701","ans":2},{"id":"147741","ans":1},{"id":"147755","ans":3},{"id":"147711","ans":3},{"id":"147723","ans":2},{"id":"147753","ans":1},{"id":"147727","ans":3},{"id":"147749","ans":4},{"id":"147699","ans":1},{"id":"147913","ans":1},{"id":"147929","ans":4},{"id":"147945","ans":3},{"id":"147941","ans":4},{"id":"147923","ans":3},{"id":"147933","ans":1},{"id":"147905","ans":2},{"id":"147935","ans":3},{"id":"147911","ans":2},{"id":"147931","ans":2},{"id":"147915","ans":1},{"id":"147949","ans":2},{"id":"147937","ans":1},{"id":"147927","ans":2},{"id":"147907","ans":1},{"id":"147939","ans":2},{"id":"147925","ans":1},{"id":"147947","ans":1},{"id":"147909","ans":2},{"id":"147917","ans":2},{"id":"147903","ans":4},{"id":"147943","ans":2},{"id":"147919","ans":4},{"id":"147921","ans":1},{"id":"148129","ans":4},{"id":"148119","ans":2},{"id":"148139","ans":4},{"id":"148109","ans":2},{"id":"148099","ans":2},{"id":"148151","ans":1},{"id":"148121","ans":4},{"id":"148097","ans":4},{"id":"148147","ans":4},{"id":"148149","ans":2},{"id":"148153","ans":1},{"id":"148113","ans":1},{"id":"148141","ans":1},{"id":"148115","ans":2},{"id":"148125","ans":1},{"id":"148107","ans":2},{"id":"148155","ans":2},{"id":"148105","ans":1},{"id":"148127","ans":2},{"id":"148143","ans":2},{"id":"148133","ans":1},{"id":"148103","ans":3},{"id":"148131","ans":2},{"id":"148101","ans":1},{"id":"148123","ans":3},{"id":"147683","ans":2},{"id":"148021","ans":4},{"id":"147767","ans":3},{"id":"148081","ans":3},{"id":"147891","ans":3},{"id":"148205","ans":3},{"id":"147865","ans":1},{"id":"147871","ans":3},{"id":"147807","ans":2},{"id":"147965","ans":2},{"id":"147873","ans":4},{"id":"148087","ans":4},{"id":"147785","ans":4},{"id":"148227","ans":4},{"id":"147695","ans":1},{"id":"147743","ans":3},{"id":"147761","ans":4},{"id":"147783","ans":3},{"id":"147853","ans":4},{"id":"147813","ans":3},{"id":"148111","ans":3},{"id":"148185","ans":3},{"id":"147827","ans":2},{"id":"147773","ans":2},{"id":"147849","ans":4},{"id":"148195","ans":1},{"id":"147897","ans":3},{"id":"148013","ans":2},{"id":"148135","ans":3},{"id":"148007","ans":3},{"id":"147787","ans":1},{"id":"147737","ans":3},{"id":"148033","ans":1},{"id":"148053","ans":2},{"id":"147999","ans":1},{"id":"147791","ans":1},{"id":"148095","ans":2},{"id":"147781","ans":1},{"id":"147985","ans":1},{"id":"147771","ans":1},{"id":"148035","ans":2},{"id":"147881","ans":2},{"id":"148233","ans":2},{"id":"148207","ans":2},{"id":"147819","ans":1},{"id":"147845","ans":1},{"id":"147889","ans":2},{"id":"147899","ans":2},{"id":"147793","ans":2},{"id":"147969","ans":1},{"id":"147799","ans":1},{"id":"148197","ans":1},{"id":"148071","ans":1},{"id":"148019","ans":2},{"id":"147689","ans":2},{"id":"147801","ans":1},{"id":"147857","ans":2},{"id":"148189","ans":2},{"id":"147847","ans":2},{"id":"147879","ans":1},{"id":"148093","ans":1},{"id":"148027","ans":2},{"id":"148219","ans":1},{"id":"148017","ans":1},{"id":"147833","ans":2},{"id":"147961","ans":1},{"id":"147687","ans":1},{"id":"147809","ans":1},{"id":"147821","ans":2},{"id":"147859","ans":2}]';
var chuangye1Json = '[{"id":"83224","ans":3},{"id":"83214","ans":3},{"id":"83219","ans":3},{"id":"83218","ans":1},{"id":"52257","ans":2},{"id":"52251","ans":3},{"id":"83235","ans":1},{"id":"83238","ans":2},{"id":"52256","ans":2},{"id":"83213","ans":4},{"id":"83223","ans":4},{"id":"83237","ans":4},{"id":"83226","ans":4},{"id":"83216","ans":1},{"id":"83240","ans":2},{"id":"83222","ans":2},{"id":"83227","ans":2},{"id":"83233","ans":2},{"id":"83239","ans":1},{"id":"83221","ans":1},{"id":"83228","ans":1},{"id":"83232","ans":2},{"id":"83234","ans":1},{"id":"83220","ans":3},{"id":"83236","ans":3},{"id":"83225","ans":2},{"id":"83231","ans":3}]';
var chuangye2Json = '[{"id":"83290","ans":2},{"id":"83284","ans":3},{"id":"83278","ans":1},{"id":"83279","ans":3},{"id":"83283","ans":1},{"id":"83297","ans":4},{"id":"83280","ans":2},{"id":"83291","ans":4},{"id":"52311","ans":4},{"id":"83286","ans":1},{"id":"83298","ans":1},{"id":"83287","ans":2},{"id":"83302","ans":2},{"id":"83303","ans":1},{"id":"83294","ans":1},{"id":"83301","ans":1},{"id":"83293","ans":1},{"id":"83289","ans":2},{"id":"83292","ans":2},{"id":"83282","ans":2},{"id":"52305","ans":4},{"id":"83299","ans":4},{"id":"83285","ans":2},{"id":"83288","ans":1}]';
var chuangye3Json = '[{"id":"83378","ans":3},{"id":"83377","ans":2},{"id":"83371","ans":4},{"id":"83375","ans":1},{"id":"83382","ans":2},{"id":"83386","ans":4},{"id":"83388","ans":3},{"id":"83368","ans":4},{"id":"83376","ans":3},{"id":"83383","ans":1},{"id":"83381","ans":1},{"id":"83374","ans":2},{"id":"83390","ans":2},{"id":"83370","ans":1},{"id":"83389","ans":2},{"id":"83369","ans":2},{"id":"83391","ans":1},{"id":"83380","ans":1},{"id":"83379","ans":2},{"id":"83372","ans":2},{"id":"83366","ans":3},{"id":"83367","ans":4},{"id":"83384","ans":4}]';
var chuangyekaoshi = '[{"id":"83224","ans":3},{"id":"83214","ans":3},{"id":"83219","ans":3},{"id":"83218","ans":1},{"id":"52257","ans":2},{"id":"52251","ans":3},{"id":"83235","ans":1},{"id":"83238","ans":2},{"id":"52256","ans":2},{"id":"83213","ans":4},{"id":"83223","ans":4},{"id":"83237","ans":4},{"id":"83226","ans":4},{"id":"83216","ans":1},{"id":"83240","ans":2},{"id":"83222","ans":2},{"id":"83227","ans":2},{"id":"83233","ans":2},{"id":"83239","ans":1},{"id":"83221","ans":1},{"id":"83228","ans":1},{"id":"83232","ans":2},{"id":"83234","ans":1},{"id":"83220","ans":3},{"id":"83236","ans":3},{"id":"83225","ans":2},{"id":"83231","ans":3},{"id":"83378","ans":3},{"id":"83377","ans":2},{"id":"83371","ans":4},{"id":"83375","ans":1},{"id":"83382","ans":2},{"id":"83386","ans":4},{"id":"83388","ans":3},{"id":"83368","ans":4},{"id":"83376","ans":3},{"id":"83383","ans":1},{"id":"83381","ans":1},{"id":"83374","ans":2},{"id":"83390","ans":2},{"id":"83370","ans":1},{"id":"83389","ans":2},{"id":"83369","ans":2},{"id":"83391","ans":1},{"id":"83380","ans":1},{"id":"83379","ans":2},{"id":"83372","ans":2},{"id":"83366","ans":3},{"id":"83367","ans":4},{"id":"83384","ans":4},{"id":"83290","ans":2},{"id":"83284","ans":3},{"id":"83278","ans":1},{"id":"83279","ans":3},{"id":"83283","ans":1},{"id":"83297","ans":4},{"id":"83280","ans":2},{"id":"83291","ans":4},{"id":"52311","ans":4},{"id":"83286","ans":1},{"id":"83298","ans":1},{"id":"83287","ans":2},{"id":"83302","ans":2},{"id":"83303","ans":1},{"id":"83294","ans":1},{"id":"83301","ans":1},{"id":"83293","ans":1},{"id":"83289","ans":2},{"id":"83292","ans":2},{"id":"83282","ans":2},{"id":"52305","ans":4},{"id":"83299","ans":4},{"id":"83285","ans":2},{"id":"83288","ans":1}]';
var chuangye3Json = '[{"id":"83378","ans":3},{"id":"83377","ans":2},{"id":"83371","ans":4},{"id":"83375","ans":1},{"id":"83382","ans":2},{"id":"83386","ans":4},{"id":"83388","ans":3},{"id":"83368","ans":4},{"id":"83376","ans":3},{"id":"83383","ans":1},{"id":"83381","ans":1},{"id":"83374","ans":2},{"id":"83390","ans":2},{"id":"83370","ans":1},{"id":"83389","ans":2},{"id":"83369","ans":2},{"id":"83391","ans":1},{"id":"83380","ans":1},{"id":"83379","ans":2},{"id":"83372","ans":2},{"id":"83366","ans":3},{"id":"83367","ans":4},{"id":"83384","ans":4}]';

// create user interface

// tipbox contains two buttons
// 1. aDev - developer tools
// 2. aMatch - auto fill in the home work
var tipbox = document.createElement("div");
tipbox.id = "tipbox"
tipbox.className = "mybox";
// devbox contains three buttons
// 1. aScan - fetch from unsubmited homework
// 2. aFetch -  fetch from submited homework
// 3. aClose -  close devbox  
var devbox = document.createElement("div");
devbox.id = "devbox"
devbox.className = "mybox";
var aDev = document.createElement("a");
aDev.id = "dev";
aDev.className = "btn";
aDev.href = "#";
aDev.innerText = "开发者工具";
aDev.addEventListener("click", function(){
    if (document.getElementById('devbox') == null)
        document.body.appendChild(devbox);
}, false);
var aClose = document.createElement("a");
aClose.id = "close";
aClose.className = "btn";
aClose.href = "#";
aClose.innerText = "关闭";
var aScan = document.createElement("a");
aScan.id = "scan";
aScan.className = "btn";
aScan.href = "#";
aScan.innerText = "抽取未提交";
aScan.addEventListener("click", function(){
    judScan = 1;
    getQuestionList();
    if (document.getElementById('jsonbox') != null)
        document.getElementById('jsonbox').remove();
    var jsonQuestionList = JSON.stringify(questionList);
    var jsonbox = document.createElement("div");
    jsonbox.id = "jsonbox"
    jsonbox.className = "mybox";
    var pJson = document.createElement("p");
    pJson.className = "centerText";
    pJson.innerText = jsonQuestionList;
    jsonbox.appendChild(pJson);
    jsonbox.appendChild(aClose.cloneNode(true));
    jsonbox.children[1].addEventListener("click", function(){
        document.getElementById("close").parentNode.remove();
    }, false);
    document.body.appendChild(jsonbox);
}, false);
var aFetch = document.createElement("a");
aFetch.id = "fetch";
aFetch.className = "btn";
aFetch.href = "#";
aFetch.innerText = "抽取已提交";
aFetch.addEventListener("click", function(){
    judScan = 0;
    getQuestionList();
    if (document.getElementById('jsonbox') != null)
        document.getElementById('jsonbox').remove();
    var jsonQuestionList = JSON.stringify(questionList);
    var jsonbox = document.createElement("div");
    jsonbox.id = "jsonbox"
    jsonbox.className = "mybox";
    var pJson = document.createElement("p");
    pJson.className = "centerText";
    pJson.innerText = jsonQuestionList;
    jsonbox.appendChild(pJson);
    jsonbox.appendChild(aClose.cloneNode(true));
    jsonbox.children[1].addEventListener("click", function(){
        document.getElementById("close").parentNode.remove();
    }, false);
    document.body.appendChild(jsonbox);
}, false);
var aMatch = document.createElement("a");
aMatch.id = "match";
aMatch.className = "btn";
aMatch.innerText = "开始答题";
aMatch.href = "#";
aMatch.addEventListener("click", function(){
    frDoc = document.getElementById('_fr').contentDocument;
    imgList = frDoc.getElementsByTagName('img');
    ddList = frDoc.getElementsByTagName('dd');
    judAns = 1;
    var h3Text = frDoc.getElementsByTagName("h3")[0].innerText.split("作业")[0];
    var targetJson = "";
	if (Exam_xinli == 1)
		targetJson = xinlikaoshi;
	else if (Exam_luoji == 1)
		targetJson = luojikaoshi;
	else
   		switch (h3Text) {
        	case "古典到现代":
            	targetJson = xinli1Json;
            	break;
        	case "大学生心理健康的标准":
           		targetJson = xinli2Json;
     	       	break;
    	    case "影响学习的非认知因素":
          	  	targetJson = xinli3Json;
            	break;
        	case "逻辑和批判性思维（六）":
            	targetJson = luoji1Json;
            	break;
			case "多重复合推理（五）":
            	targetJson = luoji2Json;
            	break;
			case "消弱、加强、假设（一）":
            	targetJson = luoji3Json;
            	break;
       	 	case "创业者与创业团队（下）":
            	targetJson = chuangye1Json;
            	break;
        	case "创业初期的营销管理（三）":
            	targetJson = chuangye2Json;
            	break;
        	case "走访身边的创业者（三）":
            	targetJson = chuangye3Json;
            	break;
        	default:
            	alert("目前题库尚未有此作业数据");
            	return;
    	}
    var curDictionary = JSON.parse(targetJson);
    var curImgId = 0;
    var curAns = 0;
    var matchNum = 0;
    var pMiss = document.createElement("p");
    pMiss.innerText = "找不到答案";
    pMiss.style.color = "red";
    for (i=0; i<ddList.length; i++) {
        curImgId = imgList[i].src.split('=')[1];
        curAns = 0;
        for (j=0; j<curDictionary.length; j++) {
            if (curImgId == curDictionary[j].id) {
                curAns = curDictionary[j].ans;
                break;
            }
        }
        // Can not match
        if (curAns == 0) {
            ddList[i].className += "noansdd";
            imgList[i].className += "noansimg";
            imgList[i].parentNode.appendChild(pMiss.cloneNode(true));
            continue ;
        }
        matchNum++;
        if (ddList[i].children[0].nodeName == "UL") {
            ddList[i].children[0].children[curAns - 1].children[0].checked = true;
        } else if (ddList[i].children[0].nodeName == "LABEL") {
            ddList[i].children[curAns - 1].children[0].checked = true;
        } else {
            alert('ddList[' + i + '].children[0].nodeName do not match.')
            break;
        }
    }
    pTotalNum.innerText = "题目总数:" + imgList.length + " 答题成功数:" + matchNum;
	if (Number.parseInt(document.getElementById('_fr').height.slice(0, -2)) < 15000)
		document.getElementById('_fr').height = "15000px";
}, false);
var pTotalNum = document.createElement("p");
pTotalNum.className = "centerText";
pTotalNum.innerText = "题目总数:" + imgList.length + " 答题成功数:0";
var pAuthor = document.createElement("p");
pAuthor.className = "centerText";
pAuthor.innerText = "凤凰院天真";
pAuthor.addEventListener("click", function(){
    pAuthor.innerText = "dwayneten.com";
    setTimeout(function(){
        pAuthor.innerText = "凤凰院天真";
    }, 500);
}, false);
pAuthor.style.marginBottom = "5px";
var aExam_xinli = document.createElement("a");
aExam_xinli.id = "Exam_xinli";
aExam_xinli.className = "btn";
aExam_xinli.href = "#";
aExam_xinli.innerText = "心理考试";
aExam_xinli.addEventListener("click", function(){
    Exam_xinli = 1 - Exam_xinli;
	if (Exam_xinli == 1)
		aExam_xinli.innerText = "心理考试 √";
	else
		aExam_xinli.innerText = "心理考试";
}, false);
var aExam_luoji = document.createElement("a");
aExam_luoji.id = "Exam_luoji";
aExam_luoji.className = "btn";
aExam_luoji.href = "#";
aExam_luoji.innerText = "逻辑考试";
aExam_luoji.addEventListener("click", function(){
    Exam_luoji = 1 - Exam_luoji;
	if (Exam_luoji == 1)
		aExam_luoji.innerText = "逻辑考试 √";
	else
		aExam_luoji.innerText = "逻辑考试";
}, false);
tipbox.appendChild(aDev);
tipbox.appendChild(aMatch);
tipbox.appendChild(aExam_xinli);
tipbox.appendChild(aExam_luoji);
aExam_luoji.style.marginTop = aExam_xinli.style.marginTop = "2px";
tipbox.appendChild(pTotalNum);
tipbox.appendChild(pAuthor);
devbox.appendChild(aFetch);
devbox.appendChild(aScan);
loadStyleString(cssLayout);
document.body.appendChild(tipbox);
