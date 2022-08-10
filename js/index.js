$(document).ready(function () {
    $('#PokeName').jqxInput({
        placeHolder: 'Type a pokemon name',
        width: 300        
    });
  

    let viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});



function ViewModel(){
    let self = this;
    self.PokemonName = ko.observable('');
    self.SearchMessage = ko.observable('');
    self.ShowMessage = ko.observable(false);

    self.PokemonName.subscribe(async function(value){
        debugger
        console.log(`Name: ${value}`);

        const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
        let response = await fetch(url);

        if(response.ok){
            self.SearchMessage('');
            self.ShowMessage(false);
        }
        else{
            self.SearchMessage('Pokemon no found');
            self.ShowMessage(true);
        }

        let result = await response.json();
    });
}

