function Question(id, ans) {
    this.id = id;
    this.ans = ans;
}
Question.prototype = {
    construtor: Question
}
var questionList = [];
var frDoc = document.getElementById('_fr').contentDocument;
var imgList = frDoc.getElementsByTagName('img');
var ddList = frDoc.getElementsByTagName('dd');
var judAns = 0;
function getQuestionList() {
    questionList = [];
    // fetch from unsubmit homework
    if (judAns == 1) {
        ddList = [];
        ddList = frDoc.getElementsByClassName("noansdd");
        imgList = [];
        imgList = frDoc.getElementsByClassName("noansimg");
        for (i=0; i<ddList.length; i++) {
            if (ddList[i].children[0].nodeName == "UL") {
                for (j=0; j<4; j++) {
                    if (ddList[i].children[0].children[j].children[0].checked == true) {
                        questionList.push(new Question(imgList[i].src.split('=')[1], j + 1));
                        break;
                    }
                }
            } else if (ddList[i].children[0].nodeName == "LABEL") {
                if (ddList[i].children[0].children[0].checked == true) {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                } else {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                }
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
            for (j=0; j<4; j++) {
                if (ddList[i].children[0].children[j].className.split(' ')[1] == "correct") {
                    questionList.push(new Question(imgList[i].src.split('=')[1], j + 1));
                    break;
                }
            }
        } else if (ddList[i].children[0].nodeName == "LABEL") {
            if (ddList[i].children[0].className == "checked") {
                if (ddList[i].children[2].className == "falseIcon") {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                } else {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                }
            } else {
                if (ddList[i].children[2].className == "falseIcon") {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 1));
                } else {
                    questionList.push(new Question(imgList[i].src.split('=')[1], 2));
                }
            }
        } else {
            alert('ddList[' + i + '].children[0].nodeName do not match.')
            break;
        }
    }
}
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
var cssLayout = '.mybox{width: 240px;min-height: 100px;border: 1px solid #ccc;box-shadow: 0 0 8px 1px #999;position: fixed;z-index: 10;margin: 0;left: 10px;background-color: #fcfcfc;font-family: "Microsoft Jhenghei","Hiragino Sans GB","Helvetica Neue","Helvetica","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;font-size: 1.2em;}#tipbox{bottom: 10px}#jsonbox{top: 10px}.btn{margin: 20px;background-color: #289fff;text-decoration: none;display: inline-block;width: 80px;line-height: 30px;text-align: center;color: #fff;}.btn:hover{text-decoration: none;color: #fff;text-shadow: #86ffff 0 0 5px;line-height: 30px;}.centerText{text-align: center;}';
var xinli1Json = '[{"id":"192547","ans":2},{"id":"192559","ans":3},{"id":"192551","ans":4},{"id":"192545","ans":4},{"id":"192575","ans":3},{"id":"192543","ans":3},{"id":"192573","ans":2},{"id":"192553","ans":1},{"id":"192541","ans":1},{"id":"192549","ans":2},{"id":"192539","ans":1},{"id":"192557","ans":1},{"id":"192531","ans":1},{"id":"192535","ans":1},{"id":"192561","ans":1},{"id":"192565","ans":1},{"id":"192577","ans":1},{"id":"192563","ans":1},{"id":"192555","ans":1},{"id":"192569","ans":1},{"id":"192571","ans":3},{"id":"192567","ans":2},{"id":"192533","ans":1},{"id":"192537","ans":1}]';
var xinli2Json = '[{"id":"192669","ans":4},{"id":"192667","ans":3},{"id":"192665","ans":3},{"id":"192701","ans":2},{"id":"192663","ans":2},{"id":"192673","ans":1},{"id":"192689","ans":1},{"id":"192697","ans":1},{"id":"192675","ans":2},{"id":"192687","ans":1},{"id":"192683","ans":1},{"id":"192671","ans":2},{"id":"192679","ans":1},{"id":"192699","ans":1},{"id":"192693","ans":2},{"id":"192677","ans":1},{"id":"192685","ans":2},{"id":"192691","ans":2},{"id":"192681","ans":1},{"id":"192695","ans":1}]';
var xinli3Json = '[{"id":"192825","ans":2},{"id":"192823","ans":1},{"id":"192819","ans":2},{"id":"192821","ans":1},{"id":"192829","ans":1},{"id":"192827","ans":2},{"id":"192831","ans":1},{"id":"192817","ans":1},{"id":"192815","ans":1}]';
var luoji1Json = '[{"id":"147739","ans":4},{"id":"147725","ans":1},{"id":"147729","ans":1},{"id":"147709","ans":4},{"id":"147731","ans":3},{"id":"147713","ans":1},{"id":"147693","ans":2},{"id":"147697","ans":3},{"id":"147691","ans":4},{"id":"147751","ans":2},{"id":"147705","ans":2},{"id":"147703","ans":1},{"id":"147745","ans":1},{"id":"147735","ans":2},{"id":"147717","ans":1},{"id":"147719","ans":2},{"id":"147757","ans":1},{"id":"147759","ans":2},{"id":"147747","ans":2},{"id":"147733","ans":1}]';
var tipbox = document.createElement("div");
tipbox.id = "tipbox"
tipbox.className = "mybox";
var aFetch = document.createElement("a");
aFetch.id = "fetch";
aFetch.className = "btn";
aFetch.href = "#";
aFetch.innerText = "开始抽取";
aFetch.addEventListener("click", function(){
    getQuestionList();
    var jsonQuestionList = JSON.stringify(questionList);
    var jsonbox = document.createElement("div");
    jsonbox.id = "jsonbox"
    jsonbox.className = "mybox";
    var pJson = document.createElement("p");
    pJson.className = "centerText";
    pJson.innerText = jsonQuestionList;
    jsonbox.appendChild(pJson);
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
}, false);
var pTotalNum = document.createElement("p");
pTotalNum.className = "centerText";
pTotalNum.innerText = "题目总数:" + imgList.length + " 答题成功数:0";
tipbox.appendChild(aFetch);
tipbox.appendChild(aMatch);
tipbox.appendChild(pTotalNum);
loadStyleString(cssLayout);
document.body.appendChild(tipbox);
