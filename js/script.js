function gerarCupom() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const observacao = document.getElementById('observacao').value;
    const data = document.getElementById('data').value;
    const statusPagamento = document.getElementById('statusPagamento').value;
    const metodoPagamento = document.getElementById('metodoPagamento').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !telefone || !endereco || !data || !statusPagamento || !metodoPagamento) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const cupomContent = `
        <div class="cupom-content">
                    <div class="cupom-content">
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="/img/logo-raymodaintima-removebg-preview (1).png" alt="Logo" style="max-width: 50%; height: auto;">
            </div>
            <p class="small-text">Data: ${data} - Hora: ${new Date().toLocaleTimeString()}</p>
            <hr>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Endereço:</strong> ${endereco}</p>
            <p><strong>Observação:</strong> ${observacao}</p>
            <p><strong>Status do Pagamento:</strong> ${statusPagamento}</p>
            <p><strong>Método de Pagamento:</strong> ${metodoPagamento}</p>
            <hr>
            <p class="footer">Obrigado pela preferência!</p>
        </div>
    `;

    document.getElementById('cupomPreview').innerHTML = cupomContent;
}

function imprimirCupom() {
    const cupomPreview = document.getElementById('cupomPreview').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Imprimir Cupom</title>
            <style>
                body {
                    font-family: "Courier New", monospace;
                    margin: 0;
                    padding: 20px;
                    text-align: left;
                    font-size: 16px;
                    width: 80mm;
                }
                .small-text {
                    font-size: 16px;
                }
                .footer {
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                }
                hr {
                    border: none;
                    border-top: 1px dashed #000;
                    margin: 5px 0;
                }
            </style>
        </head>
        <body onload="window.print();window.close()">
            ${cupomPreview}
        </body>
        </html>
    `);
    printWindow.document.close();
}
