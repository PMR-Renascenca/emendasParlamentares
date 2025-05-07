//para o botão funcionar, preciso criar uma função que chama esse botão
function buscar(){
    //pegar os valores de todos os filtros
    const origem = document.getElementById("origem").value.toLowerCase();
    const tipoProposta = document.getElementById("tipoProposta").value.toLowerCase();
    const ano = document.getElementById("ano").value;
    const tipoEmenda = document.getElementById("tipoEmenda").value.toLowerCase();
    const numeroEmenda = document.getElementById("numeroEmenda").value;
    const convenio = document.getElementById("convenio").value;
    const autor = document.getElementById("autor").value.toLowerCase();
    const funcao = document.getElementById("funcao").value.toLowerCase();
    const valorRepasse = document.getElementById("valorRepasse").value;
    const valorRepassado = document.getElementById("valorRepassado").value;

    //pegar os valores das linhas da nossa tabela
    const linhas = document.querySelectorAll('.tabela tbody tr');

    //para cada linha
    linhas.forEach(linha => {
        //pegar os valores de cada coluna
        const colunas = linha.getElementsByTagName('td');
        
        // Tratar valores monetários
        const valorRepasseTabela = colunas[8]?.textContent.replace('R$ ', '').replace('.', '').replace(',00', '') || '';
        const valorRepassadoTabela = colunas[9]?.textContent.replace('R$ ', '').replace('.', '').replace(',00', '') || '';

        //verificar se a linha atual corresponde aos filtros selecionados
        const atendeFiltros = 
            (!origem || colunas[0]?.textContent.toLowerCase() === origem) &&
            (!tipoProposta || colunas[1]?.textContent.toLowerCase() === tipoProposta) &&
            (!ano || colunas[2]?.textContent === ano) &&
            (!tipoEmenda || colunas[3]?.textContent.toLowerCase() === tipoEmenda) &&
            (!numeroEmenda || colunas[4]?.textContent === numeroEmenda) &&
            (!convenio || colunas[5]?.textContent === convenio) &&
            (!autor || colunas[6]?.textContent.toLowerCase().includes(autor)) &&
            (!funcao || colunas[7]?.textContent.toLowerCase() === funcao) &&
            (!valorRepasse || valorRepasseTabela === valorRepasse) &&
            (!valorRepassado || valorRepassadoTabela === valorRepassado);
        
        //mostrar ou esconder a linha atual
        linha.style.display = atendeFiltros ? '' : 'none';
    });
}

function limparFiltros() {
    // Limpar todos os selects
    document.getElementById("origem").selectedIndex = 0;
    document.getElementById("tipoProposta").selectedIndex = 0;
    document.getElementById("ano").selectedIndex = 0;
    document.getElementById("tipoEmenda").selectedIndex = 0;
    document.getElementById("funcao").selectedIndex = 0;

    // Limpar todos os inputs
    document.getElementById("numeroEmenda").value = "";
    document.getElementById("convenio").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("valorRepasse").value = "";
    document.getElementById("valorRepassado").value = "";

    // Mostrar todas as linhas da tabela
    const linhas = document.querySelectorAll('.tabela tbody tr');
    linhas.forEach(linha => {
        linha.style.display = '';
    });
}

function downloadPDF(pdfPath, numeroEmenda) {
    // Cria um elemento 'a' invisível
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `Emenda_${numeroEmenda}.pdf`; // Nome do arquivo para download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function mostrarDetalhes(numeroEmenda) {
    // Aqui você pode implementar a lógica para mostrar os detalhes
    // Por exemplo, abrir um modal ou redirecionar para uma página de detalhes
    alert(`Detalhes da emenda ${numeroEmenda}`);
}

document.addEventListener("DOMContentLoaded", function() {
    var detalhes2025 = document.getElementById("detalhes-2025");
    if (detalhes2025) {
        var pdf = "pdf/2025_relatorio.pdf";
        // Gera a data do dia atual
        var hoje = new Date();
        var dia = String(hoje.getDate()).padStart(2, '0');
        var mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        var ano = hoje.getFullYear();
        var dataAtualizacao = `Atualizado em ${dia}/${mes}/${ano}`;

        detalhes2025.innerHTML = `
            <button class="botao-detalhes" onclick="downloadPDF('pdf/2025.pdf')">
                Baixar PDF
            </button>
            <br>
            <span style="color: #555; font-size: 0.9em;">
                ${dataAtualizacao}
            </span>
        `;
    }
});

function alternarContraste() {
    document.body.classList.toggle('contraste-alto');
}
