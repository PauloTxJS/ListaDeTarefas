(function(){

    let inputTarefa = document.querySelector('.input-tarefa');
    let btnTarefa = document.querySelector('.btn-tarefa');
    let tarefas = document.querySelector('.tarefas');
    let data = document.querySelector('#data');
     
    function mostrarData() {
        
        let dataBrasil = new Date();
        data.innerHTML = dataBrasil.toLocaleDateString('pt-BR');

    }
   
    mostrarData();

    function criaLi() {

        let li = document.createElement('li');
        return li;

    }

    //keypress é um evento pra capturar tecla precionada.
    inputTarefa.addEventListener('keypress', function(event){

        if (event.keyCode === 13) {

            if (!inputTarefa.value) return;

            criaTarefa(inputTarefa.value);
        
        }

    });

    function limpaInput() {

        inputTarefa.value = '';
        inputTarefa.focus();

    }

    function criaBotaoApagar(li) {

        li.innerText += ' ';
        let botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        // 'setAttribute' colocar um atributo e um valor pra ele.
        botaoApagar.setAttribute('class', 'apagar');
        botaoApagar.setAttribute('title', 'apagar essa tarefa');
        li.appendChild(botaoApagar);

    }

    function criaTarefa(textoInput) {

        let li = criaLi();
        li.innerHTML = textoInput;
        tarefas.appendChild(li);
        limpaInput();
        criaBotaoApagar(li);
        salvarTarefas();

    }

    btnTarefa.addEventListener('click', function(){

        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);

    });

    document.addEventListener('click', function(event){
        //Guardar o lugar que o usuário clicar na variável element.
        let element = event.target;

        if (element.classList.contains('apagar')) {
            //Remove o 'pai' do elemento.
            element.parentElement.remove();
            salvarTarefas();

        }

    });

    function salvarTarefas() {

        let liTarefas = tarefas.querySelectorAll('li');
        let listaTarefas = [];

        for(let tarefa of liTarefas) {

            let textoTarefa = tarefa.innerText;
            //'trim()' tira o espaço em branco.
            textoTarefa = textoTarefa.replace('Apagar', '').trim();
            listaTarefas.push(textoTarefa);

        }

        let tarefasJSON = JSON.stringify(listaTarefas);
        //'localStorage' é uma mini base de dados onde você pode guardar coisas.
        //Só pode guardar string.
        localStorage.setItem('tarefas', tarefasJSON);

    }

    function adicionaTarefasSalvas() {

        let tarefas = localStorage.getItem('tarefas');
        let listaDeTarefas = JSON.parse(tarefas);

        for(let tarefa of listaDeTarefas) {

            criaTarefa(tarefa);

        }

    }

    adicionaTarefasSalvas();

})();
