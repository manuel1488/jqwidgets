$(document).ready(function () {
    $('#PokeName').jqxInput({
        placeHolder: 'Type a pokemon name',
        width: 300        
    });

    $('#base_experience').jqxInput({        
        width: 100,
        disabled: true
    });

    $('#height').jqxInput({        
        width: 100,
        disabled: true    
    });
    
    $('#name').jqxInput({        
        width: 100,
        disabled: true
    });

    $('#id').jqxInput({        
        width: 100,
        disabled: true
    });
  

    let viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});



function ViewModel(){
    let self = this;
    self.PokemonName = ko.observable('');
    self.SearchMessage = ko.observable('');
    self.ShowMessage = ko.observable(false);
    self.BaseExperience = ko.observable(0);
    self.Height = ko.observable(0);
    self.Id = ko.observable(0);
    self.Name = ko.observable('');

    self.PokemonName.subscribe(async function(value){        
        console.log(`Pokemon Name: ${value}`);

        const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
        let response = await fetch(url);

        if(response.ok){
            self.SearchMessage('');
            self.ShowMessage(false);

            let result = await response.json();
            self.BaseExperience(result.base_experience);
            self.Height(result.height);
            self.Id(result.id);
            self.Name(result.name);
            console.log(result);
        }
        else{
            self.SearchMessage('Pokemon no found');
            self.ShowMessage(true);
            self.BaseExperience(0);
            self.Height(0);
            self.Id(0);
            self.Name('');
        }        
    });
}

