import { helperFunctions } from "./helperFunctions.js";
import { about } from "./galleryDB.js";
import { indexStuff } from "./index.js";

const pageStuff = {
  constructHTML : {
    about: function(
      section = helperFunctions.generateElement('section',"about"),
      title1 = helperFunctions.generateElement('h3',"","","Astha Rai"),
      content = helperFunctions.generateElement('div',"aboutContent"),
      figure = helperFunctions.generateElement('figure'),
      img = helperFunctions.generateElement('img',"","","Photo","imgs/AR20.png"),
      textDiv = helperFunctions.generateElement('div','aboutText'),
      title2 = helperFunctions.generateElement('h3',"","","Astha Rai"),
      p = helperFunctions.generateElement('p',"", "",about)
    ){
      content = helperFunctions.nestChildren(content, figure, img);
      textDiv = helperFunctions.appendChildren(textDiv, title2, p);
      content.appendChild(textDiv);
      section = helperFunctions.appendChildren(section, title1, content);
      return section;
    },
    banner: function(
      section = helperFunctions.generateElement('section',"banner"),
      // figure = helperFunctions.generateElement('figure'),
      // img = helperFunctions.generateElement('img',"","","Banner","/imgs/AR28.png"),
      textDiv = helperFunctions.generateElement('div',"bannerText"),
      h1 = helperFunctions.generateElement('h1',"","","About"),
    ){
      // figure.appendChild(img);
      textDiv = helperFunctions.appendChildren(textDiv, h1, indexStuff.nav());
      // section = helperFunctions.appendChildren(section, textDiv, figure);
      section = helperFunctions.appendChildren(section, textDiv);
      return section
    },
    compileTogether: function(
      bodyElement  = document.querySelector('body'),
      about_return = this.about(),
      banner_return = this.banner()
      // menuBtn_return = this.menuBtn(),
      
    ){
      bodyElement = helperFunctions.appendChildren(bodyElement, banner_return, about_return, indexStuff.footer());
    },
    content: function(){}
  },

  events: {
    aboutBtn_about: function(
      target = document.querySelector('#AboutBtn'),
      menu_overlay = document.querySelector('#menu_overlay'),
      menuBtn = document.querySelector('#menuBtn')
    ){
      target.addEventListener('click',()=>{
        menu_overlay.style.opacity = "0";
        menuBtn.style.opacity = "1";
        setTimeout(function() {
          menu_overlay.style.display = "none";
        }, 750)
      })
    },
    activateAll: function(){
      this.aboutBtn_about();
      this.portfolioBtn_about();
    },
    portfolioBtn_about: function(
      target = document.querySelector('#PortfolioBtn')
      ){
        target.addEventListener('click',()=>{
          // window.location.href = "index.html";
          history.back();
        })
    },

    //   target = document.querySelector('#menuBtn'),
    //   menu_overlay = document.querySelector('#menu_overlay'),
    //   gallery = document.querySelector('#gallery')
    // ){
    //   target.addEventListener('click',()=>{
    //     gallery.style.filter = "blur(10px)";
    //     menu_overlay.style.display = "flex";
    //     menuBtn.style.opacity = "0";

    //     if (document.querySelector("#preview")){
    //       document.querySelector("#preview").style.opacity = 0;
    //     }

    //     setTimeout(function() {
    //       menu_overlay.style.opacity = "1";
    //     }, 0)
    //     setTimeout(function() {
    //       if (document.querySelector("#preview")){
    //         document.querySelector("#preview").remove();
    //       }
    //     }, 750)
    //   })
    // },


  }
}

pageStuff.constructHTML.compileTogether();
// pageStuff.events.activateAll();
// pageStuff.constructHTML.gallery();
