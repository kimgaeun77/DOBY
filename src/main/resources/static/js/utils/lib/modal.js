export default class Modal {
    #host;
    #root;
    #body;
    #title
    #hasContent = false;
    #content
    #btnCount = 1;
    #btnMsg;
    #mainColor;

    get root() {
        return this.#root;
    }

    get command() {
        return this.#root.querySelector(".frame .modal .command");
    }

    set title(title) {
        this.#title = title;
    }

    set hasContent(hasContent) {
        this.#hasContent = hasContent;
    }

    set content(content) {
        this.#content = content;
    }

    set btnCount(btnCount) {
        this.#btnCount = btnCount;
    }

    set btnMsg(btnMsg) {
        this.#btnMsg = btnMsg;
    }

    set mainColor(mainColor) {
        this.#mainColor = mainColor;
    }

    constructor() {
        this.#host = document.querySelector("#host");
        this.#root = this.#host.attachShadow({mode: "open"});
        this.#body = document.querySelector("body");
    }

    show() {
        let frame = this.#root.querySelector(".frame");
        frame.classList.add("show");
        this.#body.style.overflow = "hidden";
    }

    close() {
        let frame = this.#root.querySelector(".frame");
        frame.classList.remove("show");
        this.#body.style.overflow = "auto";
    }

    create() {
        this.#root.innerHTML = "";
        let div = document.createElement("div");
        div.classList.add("frame");

        let template;
        if (this.#hasContent)
            template = `     
                           <div class="modal">
                              <h1 class="title">${this.#title}</h1>
                              <p class="content">${this.#content}</p>
                              <div class="command">
                              </div>
                           </div>
                             
                        `;
        else
            template = `   
                            <div class="modal">
                              <h1 class="title">${this.#title}</h1>
                              <div class="command">
                              </div>
                            </div>
                        `;
        div.insertAdjacentHTML("beforeend", template);
        this.#root.appendChild(div);

        const command = this.#root.querySelector(".frame .modal .command");
        for (let i = 0; i < this.#btnCount; i++) {
            let template;
            if (i === 0)
                template = `<button class="btn ok-btn">${this.#btnMsg[i].msg}</button>`;
            else
                template = `<button class="btn cancel-btn">${this.#btnMsg[i].msg}</button>`;

            command.insertAdjacentHTML("beforeend", template);
        }

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.getStyleText());
        this.#root.adoptedStyleSheets = [sheet];
    }

    getStyleText() {

        return ` 
                    * {
                          margin: 0;
                          padding: 0;
                          box-sizing: border-box !important;
                    }
                    
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6 {
                        font-size: 100%;
                        font-weight: normal;
                    
                        margin: 0;
                        padding: 0;
                    }
                    
                    button {
                     all: unset; 
                    }
                      
                    .frame {
                      width: 100vw;
                      height: 0vh;
                
                      position: fixed;
                      top: 0;
                      left: 0;
                
                      display: flex;
                      justify-content: center;
                      align-items: center;
                
                      z-index: 999;
                
                      transition: background-color .5s;
                
                    }
                
                    .frame.show {
                      background-color: rgba(50, 50, 50, 0.5);
                      height: 100vh;
                    }
                
                    .frame .modal {
                      min-width: 330px;
                      min-height: 190px;
                
                      background-color: #fff;
                      padding: 30px;
                      border-radius: 10px;
                
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      row-gap: 25px;
                
                      transform: translateY(-50px);
                      visibility: hidden;
                      opacity: 0;
                      transition: transform .5s ease-in-out, visibility .5s ease-in-out;
                    }
                
                    .frame.show .modal {
                      transform: translateY(0px);
                      visibility: visible;
                      opacity: 1;
                    }
                
                    .frame .modal .title {
                      /* text */
                      font-size: 20px;
                      font-weight: 700;
                    }
                
                    .frame .modal .content {
                      order: -1;
                      font-size: 18px;
                    }
                
                    .frame .modal .command {
                      display: flex;
                      justify-content: center;
                      column-gap: 20px;
                
                    }
                
                    .frame .modal .command .btn {
                      width: 110px;
                      height: 40px;
                      background-color: ${this.#mainColor};
                      border-radius: 50px;
                
                      display: flex;
                      justify-content: center;
                      align-items: center;
                
                      font-size: 16px;
                      font-weight: 600;
                      color: #fff;
                    }
                
                    .frame .modal .command .btn.cancel-btn {
                      background-color: #fff;
                      border: 1px solid  #878787;
                      color: #878787;
                    }
                    
                    @media(min-width: 700px){
                      .frame .modal .title {
                         font-size: 22px;
                      }
                      
                     .frame .modal .content {
                        font-size: 20px;
                     }
                     
                     .frame .modal .command .btn {
                        font-size: 18px;
                     }
                    }
               `;
    }
}