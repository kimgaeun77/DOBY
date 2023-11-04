window.addEventListener('load', function(){
  const dotsBtnSection = document.querySelector(".dots-btn-list-container");
  const dotsBtn = dotsBtnSection.querySelector(".dots-btn");
  const dotsList = dotsBtnSection.querySelector(".list");
  const likeBtn = document.querySelector(".content-container .like-share-btn-container .like-btn");
  const shareBtn = document.querySelector(".content-container .like-share-btn-container .share-btn");
  const title = document.querySelector(".board-info .title-dots-btn-container .title")

  // ...버튼 눌렀을 때
  dotsBtn.onclick = function (){
    dotsList.classList.toggle("d:none");
  }

  // dotsList 목록
  dotsList.onclick = async function (e){
    let el = e.target;
    if(el.nodeName !== "A")
      return;
    if(el.classList.contains("delete")){
      e.preventDefault();
      let smalltalkId = title.dataset.smalltalkId;
      let result = await del(smalltalkId);

    }
  }

  // 게시글 삭제
  async function del(smalltalkId){
    let config = {
      method: "DELETE",
      // headers: {
      //   "X-CSRF-Token" :
      // }
    }
    let response = await fetch(`/api/smalltalks/${smalltalkId}`, config);
    let statusCode = response.status;
    if(statusCode !== 204)
      throw new Error("error occurred");
    location.href = `/smalltalk/list`;
  }

  // 좋아요 삭제 함수
  async function cancelLike(data){
    let config = {
      method: "DELETE",
      // headers: {
      //   "X-CSRF-Token" :
      // }
    }
    let response = await fetch(`/api/smalltalk-goods/${data.memberId},${data.smalltalkId}`, config);
    let statusCode = response.status;
    if(statusCode !== 204)
      throw new Error("error occurred");
    return true;
  }
  
  // 좋아요 추가 함수
  async function addLike(data){
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    let response = await fetch(`/api/smalltalk-goods`, config);
    let statusCode = response.status;
    if(statusCode !== 201)
      throw new Error("error occurred");
    return true;
  }

   // 좋아요
   likeBtn.onclick = async function (e){
    e.preventDefault();
    let memberId = 1;
    let smalltalkId = title.dataset.smalltalkId;
    let data = {memberId, smalltalkId};

    // 좋아요 버튼을 누르고 있다면
    if(likeBtn.classList.contains("icon-likes-fill")){
      let isCancel = await cancelLike(data);
      if(isCancel) {
        likeBtn.classList.remove("icon-likes-fill");
        likeBtn.classList.add("icon-likes");
      }

    }
    else {
      let isAdd = await addLike(data);
      if(isAdd) {
        likeBtn.classList.add("icon-likes-fill");
        likeBtn.classList.remove("icon-likes");
      }
    }
  }

  // 공유하기 버튼
  shareBtn.onclick = function (e){
    e.preventDefault();
  }
});