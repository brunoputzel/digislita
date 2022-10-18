function buscaLevel (level){
    var url = 'https://digimon-api.vercel.app/api/digimon/level/'+ level;
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {    
        let digis = data;
        

        const div = document.querySelector(`[data-js="${level}"]`)
        console.log(div)
        const h1 = document.querySelector(`[data-js="titulo-${level}"]`)
        
        const preencheTitulo = `<h1>${level}</h1>`
    
        const listdigimons = digis.reduce((accumulator,digimon) =>{
            accumulator += `
            <div class="col-lg-4">
                    <div class="card" id=${level}>
                        <img class="card-img-top" src=${digimon.img} alt="">
                        <div class="card-body">
                          <h5 class="card-title">${digimon.name}</h5>                      
                        </div>
                      </div>
                </div>`
    
            
            return accumulator
        }, '')
    
        h1.innerHTML = preencheTitulo
        div.innerHTML = listdigimons
        
    
    
        })
    }
    
    
    buscaLevel("In Training");

    buscaLevel("Fresh");

    buscaLevel("Rookie");

    buscaLevel("In Champion");

    buscaLevel("Ultimate");

    buscaLevel("Mega");

    buscaLevel("Armor");  


var pesquisa = document.querySelector("#busca");
var imag = document.querySelector("#fotos");  
var titulo = document.querySelector(".card-title");
var descricao = document.querySelector(".card-text");

const fetchDigimon = async () => {

    const response = await fetch("https://digimon-api.vercel.app/api/digimon");
    const data = await response.json();

    return data;
}

function buscaDigi () { 
    pesquisa.addEventListener("change", async({target}) => {
        const digimons = await fetchDigimon();

        const busca = digimons.find(({name}) => name.toLowerCase() === target.value.toLowerCase());

        console.log(digimons)
        const {name, level, img} = busca;
        titulo.innerHTML = `${name}`
        descricao.innerHTML = `${level}`
        imag.src = img

        return busca;
        
    }) 

}

window.onload = () => buscaDigi();