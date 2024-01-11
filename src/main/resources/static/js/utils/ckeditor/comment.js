let placeHolder;
window.addEventListener("load", function (){
    const memberId = document.querySelector("#member-id");
    if (!memberId) placeHolder = "로그인 후 이용 가능합니다.";
    else placeHolder = "내용을 입력해 주세요.";
});

export default function createEditor(className) {
    return ClassicEditor.create(document.querySelector(className), {
        ckfinder: {
            uploadUrl: 'https://file.doby.co.kr/api/images'
        },
        toolbar: {
            items: [
                'bold', 'strikethrough', 'underline', '|',
                'link', 'codeBlock'
            ],
            shouldNotGroupWhenFull: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
        },
        placeholder: placeHolder
    })
        .then(editor => editor)
        .catch((error) => {
            console.error(error);
        });
}
