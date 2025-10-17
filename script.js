// 入力値の正当性
const checkList = {'sei_kanji': false, 'mei_kanji': false, 'shi_kana': false, 'mei_kana': false, 'gender': false, 'age': false};

// エラー文表示関数                 id・エラー内容ごとのメッセージを表示したいので、後述のメイン関数で引数に積んでもらう
function displayError(subjectId, message) {
    const errorSubject = document.getElementById(`error_${subjectId}`);
    // 対象にエラーが発生していたら
    if (errorSubject) {
        errorSubject.textContent = message; // idごとのメッセージを表示
    }
}

// エラー文削除関数
function deleteError(subjectId) {
    const correctSubject = document.getElementById(`error_${subjectId}`);
    // 対象が正常に入力されていたら
    if (correctSubject) {
        correctSubject.textContent = ''; // エラー文削除
    }
}

// 枠線を赤にする関数
function changeBorderColor(subjectId) {
    const subjectBorder = document.getElementById(`${subjectId}`);
    subjectBorder.style.borderColor = 'red'
}

// 枠線の色をもとに戻す関数
function undoBorderColor(subjectId) {
    const subjectBorder = document.getElementById(`${subjectId}`);
    subjectBorder.style.borderColor = ''
}

// 入力値チェック関数
function inputCheck(user_input) {
    let error_message = '';
    
    // 必須入力チェック
    if (user_input.value === '') {
        displayError(user_input.id, '入力は必須です');
        checkList[user_input.id] = false;
        changeBorderColor(user_input.id);
        switchingButton();
        return; // 入力されていなければ以下のチェックは不要
    }

    // 入力値チェック
    switch (user_input.id) {
        // <姓名>　数字・記号は弾く
        case 'sei_kanji':
        case 'mei_kanji':
            if (/[^a-zA-Zー\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(user_input.value)) {
                checkList[user_input.id] = false;
                error_message = '数字、記号、空白は使えません'
                changeBorderColor(user_input.id)
            } else {
                checkList[user_input.id] = true;
                undoBorderColor(user_input.id)
            }
            break;

        // <氏名>　カナ以外を弾く
        case 'shi_kana':
        case 'mei_kana':
            if (/[^ァ-ヶー]/.test(user_input.value)) {
                checkList[user_input.id] = false;
                error_message = 'カタカナで入力してください'
                changeBorderColor(user_input.id)
            } else {
                checkList[user_input.id] = true;
                undoBorderColor(user_input.id)
            }
            break;

        case 'age':
            if (/[^0-9]/.test(user_input.value)) {
                checkList[user_input.id] = false;
                error_message = '半角数字で入力してください';
                changeBorderColor(user_input.id)
            } else {
                checkList[user_input.id] = true;
                undoBorderColor(user_input.id)
            }
    }

    if (error_message) {
        displayError(user_input.id, error_message);
    } else {
        deleteError(user_input.id);
    }
    isCheckedGender();
    switchingButton();
};

// 性別のラジオボタンがなにかしら選択されているか判別する関数
function isCheckedGender() {
    const radio = document.querySelector('input[name="radio_gender"]:checked');
        if (radio) {
            checkList['gender'] = true;
            return;
        } else {
            checkList['gender'] = false;
        }
}

// ラジオボタンの監視
document.querySelectorAll('input[name="radio_gender"]').forEach(radio => {
    radio.addEventListener('change', switchingButton);
});

// ボタンの活性状況を操作する関数
function switchingButton() {
    isCheckedGender();
    for (const id in checkList) {
        if (checkList[id] == false) {
            document.querySelector('.btn_next').disabled = true;
            return;
        }
    }
    document.querySelector('.btn_next').disabled = false;
}

// enterキーの無効化
if (document.getElementById('form_submit')) {
    document.getElementById('form_submit').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    })
}

// 次へボタン押下
document.form_submit.btn_next.addEventListener('click', () => {
    alert('ボタン押下')
    // document.form_submit.submit();
});