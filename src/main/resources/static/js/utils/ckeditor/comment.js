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
        placeholder: '내용을 입력해주세요.'
    })
        .then(editor => editor)
        .catch((error) => {
            console.error(error);
        });
}
