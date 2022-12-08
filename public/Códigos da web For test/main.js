/// ; Pega o select#Nivel_escolar
let Nivel_escolar = document.getElementById("Nivel_escolar");

const value_elem_id = { 
  'Médio':'Turma_medio',
/// ^ value   :  ^ id do select turma **
  'Subsequente':'Turma_sub'
};

/// ; Define o evento onchange no select#Nivel_escolar
Nivel_escolar.onchange = function(){
    /// ; this aqui dentro é o select#Nivel_escolar
    let valor = this.value;                     /// ; <- valor selecionado
    let selects = Array.from(                   /// ; <- transforma o resultado em array
      document.getElementsByTagName('select')   /// ; <- pega todos os selects 
    );
    
    selects.forEach(function(el){
    
        if(el.id != 'Nivel_escolar')  /// ; <- se o select não for o de Nivel_escolar display=none
            el.style.display='none';
        if(el.id == value_elem_id[valor] )  /// ; <- se o select é o da turma display=block;
            el.style.display='block';
            
    });
    /// document.getElementById( value_elem_id[valor] ).style.display='block';
    /// ; outra forma de dar display block      
}
