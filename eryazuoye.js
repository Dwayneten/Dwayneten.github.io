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
var judScan = 0;
function getQuestionList() {
    questionList = [];
    frDoc = document.getElementById('_fr').contentDocument;
    imgList = frDoc.getElementsByTagName('img');
    ddList = frDoc.getElementsByTagName('dd');
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
    // fetch from empty homework
    if (judScan == 1) {
        for (i=0; i<ddList.length; i++) {
            ddList[i].className += "noansdd";
            imgList[i].className += "noansimg";
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
var cssLayout = '.mybox{width: 240px;min-height: 70px;border: 1px solid #ccc;box-shadow: 0 0 8px 1px #999;position: fixed;z-index: 10;margin: 0;left: 10px;background-color: #fcfcfc;font-family: "Microsoft Jhenghei","Hiragino Sans GB","Helvetica Neue","Helvetica","WenQuanYi Micro Hei","Microsoft YaHei",Arial,sans-serif;font-size: 1.2em;}#tipbox{bottom: 10px;}#jsonbox{top: 10px;}#devbox{bottom: 120px;}.btn{margin: 20px 20px 10px 20px;background-color: #289fff;text-decoration: none;display: inline-block;width: 80px;line-height: 30px;text-align: center;color: #fff;}.btn:hover{text-decoration: none;color: #fff;text-shadow: #86ffff 0 0 5px;line-height: 30px;}.centerText{text-align: center;}';
var xinli1Json = '[{"id":"192547","ans":2},{"id":"192559","ans":3},{"id":"192551","ans":4},{"id":"192545","ans":4},{"id":"192575","ans":3},{"id":"192543","ans":3},{"id":"192573","ans":2},{"id":"192553","ans":1},{"id":"192541","ans":1},{"id":"192549","ans":2},{"id":"192539","ans":1},{"id":"192557","ans":1},{"id":"192531","ans":1},{"id":"192535","ans":1},{"id":"192561","ans":1},{"id":"192565","ans":1},{"id":"192577","ans":1},{"id":"192563","ans":1},{"id":"192555","ans":1},{"id":"192569","ans":1},{"id":"192571","ans":3},{"id":"192567","ans":2},{"id":"192533","ans":1},{"id":"192537","ans":1}]';
var xinli2Json = '[{"id":"192669","ans":4},{"id":"192667","ans":3},{"id":"192665","ans":3},{"id":"192701","ans":2},{"id":"192663","ans":2},{"id":"192673","ans":1},{"id":"192689","ans":1},{"id":"192697","ans":1},{"id":"192675","ans":2},{"id":"192687","ans":1},{"id":"192683","ans":1},{"id":"192671","ans":2},{"id":"192679","ans":1},{"id":"192699","ans":1},{"id":"192693","ans":2},{"id":"192677","ans":1},{"id":"192685","ans":2},{"id":"192691","ans":2},{"id":"192681","ans":1},{"id":"192695","ans":1}]';
var xinli3Json = '[{"id":"192825","ans":2},{"id":"192823","ans":1},{"id":"192819","ans":2},{"id":"192821","ans":1},{"id":"192829","ans":1},{"id":"192827","ans":2},{"id":"192831","ans":1},{"id":"192817","ans":1},{"id":"192815","ans":1}]';
var luoji1Json = '[{"id":"147739","ans":4},{"id":"147725","ans":1},{"id":"147729","ans":1},{"id":"147709","ans":4},{"id":"147731","ans":3},{"id":"147713","ans":1},{"id":"147693","ans":2},{"id":"147697","ans":3},{"id":"147691","ans":4},{"id":"147751","ans":2},{"id":"147705","ans":2},{"id":"147703","ans":1},{"id":"147745","ans":1},{"id":"147735","ans":2},{"id":"147717","ans":1},{"id":"147719","ans":2},{"id":"147757","ans":1},{"id":"147759","ans":2},{"id":"147747","ans":2},{"id":"147733","ans":1}]';
var chuangye1Json = '[{"id":"83224","ans":3},{"id":"83214","ans":3},{"id":"83219","ans":3},{"id":"83218","ans":1},{"id":"52257","ans":2},{"id":"52251","ans":3},{"id":"83235","ans":1},{"id":"83238","ans":2},{"id":"52256","ans":2},{"id":"83213","ans":4},{"id":"83223","ans":4},{"id":"83237","ans":4},{"id":"83226","ans":4},{"id":"83216","ans":1},{"id":"83240","ans":2},{"id":"83222","ans":2},{"id":"83227","ans":2},{"id":"83233","ans":2},{"id":"83239","ans":1},{"id":"83221","ans":1},{"id":"83228","ans":1},{"id":"83232","ans":2},{"id":"83234","ans":1},{"id":"83220","ans":3},{"id":"83236","ans":3},{"id":"83225","ans":2},{"id":"83231","ans":3}]';
var chuangye2Json = '[{"id":"83290","ans":2},{"id":"83284","ans":3},{"id":"83278","ans":1},{"id":"83279","ans":3},{"id":"83283","ans":1},{"id":"83297","ans":4},{"id":"83280","ans":2},{"id":"83291","ans":4},{"id":"52311","ans":4},{"id":"83286","ans":1},{"id":"83298","ans":1},{"id":"83287","ans":2},{"id":"83302","ans":2},{"id":"83303","ans":1},{"id":"83294","ans":1},{"id":"83301","ans":1},{"id":"83293","ans":1},{"id":"83289","ans":2},{"id":"83292","ans":2},{"id":"83282","ans":2},{"id":"52305","ans":4},{"id":"83299","ans":1},{"id":"83285","ans":2},{"id":"83288","ans":1}]';
var chuangye3Json = '[{"id":"83378","ans":3},{"id":"83377","ans":2},{"id":"83371","ans":4},{"id":"83375","ans":1},{"id":"83382","ans":2},{"id":"83386","ans":4},{"id":"83388","ans":3},{"id":"83368","ans":4},{"id":"83376","ans":3},{"id":"83383","ans":1},{"id":"83381","ans":1},{"id":"83374","ans":2},{"id":"83390","ans":2},{"id":"83370","ans":1},{"id":"83389","ans":2},{"id":"83369","ans":2},{"id":"83391","ans":1},{"id":"83380","ans":1},{"id":"83379","ans":2},{"id":"83372","ans":2},{"id":"83366","ans":3},{"id":"83367","ans":4},{"id":"83384","ans":4}]';
var tipbox = document.createElement("div");
tipbox.id = "tipbox"
tipbox.className = "mybox";
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
tipbox.appendChild(aDev);
tipbox.appendChild(aMatch);
tipbox.appendChild(pTotalNum);
tipbox.appendChild(pAuthor);
devbox.appendChild(aFetch);
devbox.appendChild(aScan);
loadStyleString(cssLayout);
document.body.appendChild(tipbox);
