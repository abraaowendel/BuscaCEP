
const isValid = async (cep) => {
    const regex = /^[0-9]+$/
    return cep.length === 8 && regex.test(cep)? true:false
}

const searchCEP = async () => {
    const cep = document.querySelector('#cep').value
    const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`
    try {

        if(await isValid(cep)){
            const adress = await fetch(viaCepUrl)
            const resultAdress = await adress.json();
            if(resultAdress.hasOwnProperty('erro')){
                throw{
                    "name": "ErroCEP",
                    "message": "Não foi possível consultar o CEP"
                }
            }else{
                cleanError();
                removeModal();
                await creatModal(resultAdress);
            } 
        }
        else{
            throw{
                "name": "ErroCEP",
                "message": "CEP inválido"
            }
        }
    } catch (error) {
        cleanError();
        showError(error.message);
    }
}

const showError = (erro) =>{
    const container = document.querySelector('.zip__code-typed');
    const errorReturn = document.createElement('div');
    errorReturn.classList.add('modal__error');
    errorReturn.innerHTML =  `<h1>${erro}.</h1>`;
    container.appendChild(errorReturn);
}
const cleanError = () => {
    const container = document.querySelector('.zip__code-typed');
    const errorReturn = document.querySelector('.modal__error');
    if(errorReturn){
        container.removeChild(errorReturn)
    }
}
const creatModal = async (result) =>{
    const container = document.querySelector('.container')
    const modal = document.createElement('div')
    const form = document.querySelector('form')
    form.style.display = 'none';
    modal.classList.add('modal')
    modal.innerHTML = `
    <div class="modal__content">      
        <input type="text" id="street" readonly placeholder="Rua">
        <input type="text" id="district" readonly placeholder="Centro">
        <input type="text" id="city" readonly placeholder="Cidade">
        <input type="text" id="state" readonly placeholder="Estado">
    </div>
    <div id="modal__close">
        <img src="./assets/img/close.svg" alt="">
    </div>
    `
    container.appendChild(modal)
    document.getElementById('street').value = `${isEmpty(result.logradouro)}`;
    document.getElementById('district').value = isEmpty(result.bairro);
    document.getElementById('city').value = isEmpty(result.localidade);
    document.getElementById('state').value = await formatState(result.uf);
    document.getElementById('modal__close').addEventListener('click', removeModal)
}

const removeModal =  () =>{
    const modal = document.querySelector('.modal')
    const container = document.querySelector('.container')
    const form = document.querySelector('form')
    if(modal){
        clearSearchCEP();
        container.removeChild(modal)
        form.style.display = 'block';
    }
}

const isEmpty = (result) => result === '' ? ` ${result}`: result;

const clearSearchCEP = () =>{
    document.getElementById('cep').value = '';
    document.getElementById('street').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}

const search = document.querySelector('#search__cep').addEventListener('click', searchCEP)
const form = document.querySelector('form')
form.addEventListener('submit', (event) => event.preventDefault())

const formatState = async (state) =>{
    switch(state){
        case "AC":
            state = "Acre";
            break
        case "AL":
            state = "Alagoas";
            break
        case "AP":
            state = "Amapá";
            break
        case "AM":
            state = "Amazonas";
            break
        case "BA":
            state = "Bahia";
            break
        case "CE":
            state = "Ceará";
            break
        case "DF":
            state = "Distrito Federal";
            break
        case "ES":
            state = "Espirito Santo";
            break
        case "GO":
            state = "Goiânia";
            break
        case "MA":
            state = "São Luís";
            break
        case "MT":
            state = "Cuiabá";
            break
        case "MS":
            state = "Campo Grande";
            break
        case "MG":
            state = "Belo Horizonte";
            break
        case "PA":;
            state = "Belém"
            break
        case "PB":
            state = "João Pessoa";
            break
        case "PR":
            state = "Curitiba";
            break
        case "PE":
            state = "Recife";
            break
        case "PI":
            state = "Teresina";
            break
        case "RJ":
            state = "Rio de Janeiro";
            break
        case "RN":
            state = "Natal";
            break
        case "RS":
            state = "Porto Alegre";
            break
        case "RO":
            state = "Porto Velho";
            break
        case "RR":
            state = "Boa Vista";
            break
        case "SC":
            state = "Florianópolis";
            break
        case "SP":
            state = "São Paulo";
            break
        case "SE":
            state = "Aracaju";
            break
        case "TO":
            state = "Palmas";
            break
    }
    return state
} 