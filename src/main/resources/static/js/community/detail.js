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
      let communityId = title.dataset.communityId;
      let result = await del(communityId);

    }
  }

  // 게시글 삭제
  async function del(communityId){
    let config = {
      method: "DELETE",
      // headers: {
      //   "X-CSRF-Token" :
      // }
    }
    let response = await fetch(`/api/communitys/${communityId}`, config);
    let statusCode = response.status;
    if(statusCode !== 204)
      throw new Error("error occurred");
    location.href = `/community/list`;
  }

  // 좋아요 삭제 함수
  async function cancelLike(data){
    let config = {
      method: "DELETE",
      // headers: {
      //   "X-CSRF-Token" :
      // }
    }
    let response = await fetch(`/api/community-goods/${data.memberId},${data.communityId}`, config);
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
    let response = await fetch(`/api/community-goods`, config);
    let statusCode = response.status;
    if(statusCode !== 201)
      throw new Error("error occurred");
    return true;
  }

   // 좋아요
   likeBtn.onclick = async function (e){
    e.preventDefault();
    let memberId = 1;
    let communityId = title.dataset.communityId;
    let data = {memberId, communityId};

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