import { helperFunctions } from "./helperFunctions.js";
import { galleryDB } from "./galleryDB.js";
import { indexStuff } from "./index.js";

const pageStuff = {
  constructHTML : {
    // about: function(
    //   section = helperFunctions.generateElement('section',"about"),
    //   h3 = helperFunctions.generateElement('h3',"","","About"),
    //   // p = helperFunctions.generateElement('p',"", "",about)
    // ){
    //   section = helperFunctions.appendChildren(section, h3, p);
    //   return section;
    // },
    compileTogether: function(
      bodyElement  = document.querySelector('body'),
      gallery_return = this.gallery(),
      titleBanner_return = this.titleBanner(),
      // about_return = this.about(),
    ){
      bodyElement = helperFunctions.appendChildren(bodyElement, gallery_return, indexStuff.footer());
      gallery_return.insertBefore(titleBanner_return, gallery_return.children[1]);
    },
    gallery: function(
      gallery_tag = helperFunctions.generateElement('section',"gallery"),
      counter = 0,
      DB_array = [],
      rows = []
    ){
      for (const key in galleryDB) {
          if (Object.hasOwnProperty.call(galleryDB, key)) {
            const item = galleryDB[key];
            DB_array.push(item);
          }
        }
      // console.log(DB_array)

      for (let i = 0; i < 4; i++){
        rows.push(helperFunctions.generateElement('div',`row${i}`,"row"))
        if (i%2 == 0){
          rows[i].classList.add('slideRight');
        }
        else {rows[i].classList.add('slideLeft')};
        gallery_tag.appendChild(rows[i]);
      

        for(let ii = 0; ii < 8; ii++){
          let figure = helperFunctions.generateElement('figure');
          let overlay = helperFunctions.generateElement('div',`${DB_array[i*8+ii].id}`,"overlay");
          let img = helperFunctions.generateElement('img',"","",`${DB_array[i*8+ii].id}`,`${DB_array[i*8+ii].imgPath}`)
          
          figure = helperFunctions.appendChildren(figure, overlay,img);
          rows[i].appendChild(figure);
        }
      }



      return gallery_tag;
    },
    menuBtn: function(
      menuBtn = helperFunctions.generateElement('button',"menuBtn","","😀")
    ){
      return menuBtn;
    },
    titleBanner: function(
      titleBanner_tag = helperFunctions.generateElement('div',"titleBanner","row"),
      h1 = helperFunctions.generateElement('h1',"","","Astha Rai"),
      h2 = helperFunctions.generateElement('h2',"","","Digital Illustrations Portfolio"),
    ){
      titleBanner_tag = helperFunctions.appendChildren(titleBanner_tag, h1, h2, indexStuff.nav());
      titleBanner_tag.style.animationName = "none";
      return titleBanner_tag;
    },
    singlePreview: function(
      galleryDB_item,
      targetRow,
      gallery = document.querySelector("#gallery"),
      preview = helperFunctions.generateElement('section', "preview"),
      figure = helperFunctions.generateElement('figure'),
      img = helperFunctions.generateElement('img',"","",galleryDB_item.id,galleryDB_item.imgPath),
      ){
        gallery.style.filter = "blur(10px)";

        preview = helperFunctions.nestChildren(preview, figure, img);
        preview.addEventListener('click', (e)=>{
          preview.style.opacity = 0;
          gallery.style.filter = "none";
          setTimeout(function() {
            preview.remove();
          }, 750)
          // targetRow.style.animationPlayState = "running";
          
        })
        return preview;
    },
  },

  events: {
    activateAll: function(){
      // this.aboutBtn();
      this.imgBtns();
      // this.menuBtn_portfolio();
      // this.portfolioBtn();
    },
    imgBtns: function(
      figureArray = document.querySelectorAll('figure')
    ){
      figureArray.forEach(figure => {
        figure.addEventListener('click', (e)=>{
          // console.log(e.target.id);
          for (const key in galleryDB) {
            if ((Object.hasOwnProperty.call(galleryDB, key) && (galleryDB[key].id == e.target.id))) {
              const item = galleryDB[key];
              let targetRow = e.target.parentNode.parentNode;
              // targetRow.style.animationPlayState = "paused";
              let previewElement = pageStuff.constructHTML.singlePreview(item, targetRow);
              document.querySelector('body').appendChild(previewElement);
              setTimeout(function() {
                previewElement.style.opacity = 1;
              }, 0)
            }
          }
        })
      });
    },
    menuBtn_portfolio: function(
      target = document.querySelector('#menuBtn'),
      menu_overlay = document.querySelector('#menu_overlay'),
      gallery = document.querySelector('#gallery')
    ){
      target.addEventListener('click',()=>{
        gallery.style.filter = "blur(10px)";
        menu_overlay.style.display = "flex";
        menuBtn.style.opacity = "0";

        if (document.querySelector("#preview")){
          document.querySelector("#preview").style.opacity = 0;
        }

        setTimeout(function() {
          menu_overlay.style.opacity = "1";
        }, 0)
        setTimeout(function() {
          if (document.querySelector("#preview")){
            document.querySelector("#preview").remove();
          }
        }, 750)
      })
    },
    portfolioBtn: function(
      target = document.querySelector('#PortfolioBtn'),
      menu_overlay = document.querySelector('#menu_overlay'),
      gallery = document.querySelector('#gallery'),
      menuBtn = document.querySelector('#menuBtn')
    ){
      target.addEventListener('click',()=>{
        gallery.style.filter = "none";
        menu_overlay.style.opacity = "0";
        menuBtn.style.opacity = "1";
        setTimeout(function() {
          menu_overlay.style.display = "none";
        }, 750)
      })
    },
    aboutBtn: function(
      target = document.querySelector('#AboutBtn')
      ){
        target.addEventListener('click',()=>{
          window.location.href = "about.html";
        })
    }
  }
}

pageStuff.constructHTML.compileTogether();
pageStuff.events.activateAll();
// pageStuff.constructHTML.gallery();
