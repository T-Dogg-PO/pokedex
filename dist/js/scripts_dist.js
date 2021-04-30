let pokemonRepository=function(){let e=[];const t="https://pokeapi.co/api/v2/pokemon/?limit=";let n=`${t}151`;function o(t){e.push(t)}function a(){return e}function s(){return document.querySelector("#loading").classList.add("show-loading-spinner"),fetch(n).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let t={name:e.name,detailsUrl:e.url};t.name=t.name.charAt(0).toUpperCase()+t.name.slice(1),o(t)}),r()}).catch(function(e){console.error(e),r()})}function i(e){p();let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.other["official-artwork"].front_default,e.height=t.height,e.types=t.types,d()}).catch(function(e){console.error(e),d()})}function l(e){let t=$("#pokemon-list"),n=$('<li class="list-group-item col col-lg-3 border-0 m-auto"></li>'),o=$(`<button type="button" data-toggle="modal" data-target="#pokemonModal" class="btn btn-block">${e.name}</button>`);n.append(o),t.append(n),o.on("click",function(){c(e)})}function c(e){i(e).then(function(){let t=$("#pokemon-modal-header"),n=$("#pokemon-modal-body");n.empty(),t.empty(),p();let o=$(`<h1 class="w-100 text-center">${e.name}</h1>`),a=$(`<p class="text-center">Height: ${e.height/10}m</p>`),s=$('<p class="text-center">Types: </p>');e.types.forEach(function(e){let t=$(`<span class="${e.type.name} pokemon-type text-center"></span>`),n=e.type.name.charAt(0).toUpperCase()+e.type.name.slice(1);t.text(`${n} `),s.append(t)});let i=$(`<img class="img-fluid" src="${e.imageUrl}">`),l=$('<button type="button" class="btn-close" data-dismiss="modal" aria-label="close">X</button>');d(),t.append(o),t.append(l),n.append(a),n.append(s),n.append(i)})}function r(){document.querySelector("#loading").classList.remove("show-loading-spinner")}function p(){document.querySelector("#loading-modal").classList.add("show-loading-spinner")}function d(){document.querySelector("#loading-modal").classList.remove("show-loading-spinner")}$(".dropdown-item").on("click",function(){let o=$(this).attr("id"),i=$(this);$(".active").removeClass("active"),i.addClass("active"),"all"===o?n=`${t}898`:"gen1"===o?n=`${t}151`:"gen2"===o?n=`${t}100&offset=151`:"gen3"===o?n=`${t}135&offset=251`:"gen4"===o?n=`${t}107&offset=386`:"gen5"===o?n=`${t}156&offset=493`:"gen6"===o?n=`${t}72&offset=649`:"gen7"===o?n=`${t}88&offset=721`:"gen8"===o&&(n=`${t}89&offset=809`),$("#pokemon-list").children().remove(),e=[],s().then(function(){a().forEach(function(e){l(e)})})});let u=$("#pokemon-search");return u.on("input",function(){let e=$(".list-group-item"),t=u.val().toLowerCase();e.each(function(){$(this).text().toLowerCase().indexOf(t)>-1?this.style.display="":this.style.display="none"})}),{add:o,getAll:a,loadList:s,loadDetails:i,addListItem:l,showDetails:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});