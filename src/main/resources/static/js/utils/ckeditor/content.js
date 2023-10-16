let editor;

ClassicEditor.create(document.querySelector('.editor'), {
    ckfinder: {
        uploadUrl: 'https://file.doby.co.kr/api/images'
    },
    toolbar: {
        shouldNotGroupWhenFull: true,
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
    },
    placeholder: '내용을 입력해주세요.',
    removePlugins: ['Title', 'Heading', 'Italic'],
})
    .then((newEditor) => {
        editor = newEditor;
    })
    .catch((error) => {
        console.error(error);
    });
export {editor};
