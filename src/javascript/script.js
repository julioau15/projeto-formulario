// seleciona o form inteiro
const form = document.querySelector('#form');

// adiciona uma função acionada quando o botão for pressionado
form.addEventListener('submit', function (e) {
    e.preventDefault();

// constante geral usada para todos os fields
    const fields = [
        {
            id: 'name',
            label:'nome',
            validator: nameIsValid
        },

        {
            id:'last-name',
            label:'Sobrenome',
            validator: nameIsValid
        },

        {
            id: 'birthdate',
            label: 'Nascimento',
            validator: dateIsValid
        },

        {
            id: 'email',
            label: 'E-mail',
            validator: emailIsValid
        },

        {
            id: 'password',
            label: 'Senha',
            validator: passwordIsSecure
        },

        {
            id: 'confirm-password',
            label: 'Confirmar-senha',
            validator: passwordMatch
        }
    ]
// constante do icone de erro
    const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

// função para todos os fields que seliceiona a constante fields
// ela gera a mensagem de erro para todos
    fields.forEach(function (field) {

        //essas constantes precisam pegar valores especificos para se adequar a costante fields
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input-box');
        const inputValue = input.value;

        // seleciona a classe error
        const errorSpan = inputBox.querySelector('.error');
        // muda o conteudo dessa classe no html
        errorSpan.innerHTML = '';


        // remove a classe invalid e adiciona a classe valid
        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidator = field.validator(inputValue);
        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
            return;
        }
    })  

    // os inputs de genero são diferentes e precisam desses parametros
    const genders = document.getElementsByName('gender'); // seleciona pelo nome
    const radioContainer = document.querySelector('.radio-container');
    const genderErrorSpan = radioContainer.querySelector('.error');

    // essa constante encontra as opções de genero marcadas
    // ela deve ser invalida e gera a mensagem de erro
    const selectedGender = [...genders].find(input => input.checked);
    radioContainer.classList.add('invalid');
    radioContainer.classList.remove('valid');
    genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`;
    
    // quando for verdadeira ela retira a mensagem de erro
    if (selectedGender){
        radioContainer.classList.remove('invalid');
        genderErrorSpan.innerHTML = '';
        radioContainer.classList.add('valid');
        return;
    }
})
// quando o valor for true ele retorna sem erro
function isEmpty(value){
    return value === '';
}

// função que define se os nomes são validos
function nameIsValid(value){
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if (isEmpty(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo é obrigatório!';
        return validator;
    }
    // minimo de caracteres no nome
    const min = 3;

    if(value.length < min){
        validator.isValid = false;
        validator.errorMessage = `O nome deve ter no minimo ${min} caracteres.`;
        return validator;
    }

    // a constante regex adiciona uma validação do conteudo do input, se ele é apenas letras por exemplo
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo deve conter apenas letras'
    }
    return validator;
}

// verifica se a data de nascimento é válida
function dateIsValid(value){
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo é obrigatório!';
        return validator;
    }

    // constante que pega a data 
    //getFullYear() pega a data atual
    const year = new Date(value).getFullYear();

    if (year < 1920 || year > new Date().getFullYear()){
        validator.isValid = false;
        validator.errorMessage = 'Data invalida!';
        return validator;
    }

    return validator;
}

// verifica se o email é valido
function emailIsValid(value){
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo é obrigatório!';
        return validator;
    }

    // esse regex verifica a quantidade de caracteres, minusculas, maiusculas...
   const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
   if (!regex.test(value)){
        validator.isValid = false;
        validator.errorMessage = 'O email precisa ser válido!';
        return validator;
   }

    return validator;
}

// verifica se a senha é segura
function passwordIsSecure(value){
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo é obrigatório!';
        return validator;
    }

     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[\w $*&@#]{8,}$/;
     if (!regex.test(value)){
        validator.isValid = false;
        validator.errorMessage = `
        A senha precisa ser segura! <br/>
        deve conter no minimo: <br/>
        8 caracteres  <br/>
        1 letra minúscula <br/>
        1 letra maiuscúla <br/>
        1 número <br/>
        1 caractere especial <br/>
        `;
        return validator;
   }

    return validator;
}

// verifica se a senha bate com a confimação de senha
function passwordMatch(value){
    const validator = {
        isValid: true,
        errorMessage: null
    }

    if (isEmpty(value)){
        validator.isValid = false;
        validator.errorMessage = 'O campo é obrigatório!';
        return validator;
    }


    const passwordValue = document.getElementById('password').value;
    if (value === '' || passwordValue !== value){
        validator.isValid = false;
        validator.errorMessage = 'A senha precisa ser igual!';
        return validator;
    }

    return validator;
}

// seleciona os icons da senha
const passwordIcons = document.querySelectorAll('.password-icon');

// faz para cada password-icon:
passwordIcons.forEach(icon => {

    // quando clicar no icon ele deve:
    icon.addEventListener('click', function (){

        //seleciona o input
        const input = this.parentElement.querySelector('.form-control');
        // se for tipo texto ele troca para senha e vice-versa
        input.type = input.type === 'password' ? 'text' : 'password';

        //troca o icone da senha
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    })
})