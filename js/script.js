function gerarCupom() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const observacao = document.getElementById('observacao').value;
    const data = document.getElementById('data').value;
    const statusPagamento = document.getElementById('statusPagamento').value;
    const metodoPagamento = document.getElementById('metodoPagamento').value;
    const valorTotal = document.getElementById('valorTotal').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !telefone || !endereco || !data || !statusPagamento || !metodoPagamento || !valorTotal) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Formata a data para o formato brasileiro
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    // Formata o valor total para BRL
    const valorTotalFormatado = parseFloat(valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const cupomContent = `
        <div class="cupom-content">
            <hr>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Endereço:</strong> ${endereco}</p>
            <p><strong>Observação:</strong> ${observacao}</p>
            <p><strong>Status do Pagamento:</strong> ${statusPagamento}</p>
            <p><strong>Método de Pagamento:</strong> ${metodoPagamento}</p>
            <p><strong>Valor Total:</strong> ${valorTotalFormatado}</p>
            <p class="small-text">Data: ${dataFormatada} - Hora: ${horaAtual}</p>
            <hr>
            <p class="footer">Obrigado pela preferência!</p>
        </div>
    `;

    document.getElementById('cupomPreview').innerHTML = cupomContent;
}
