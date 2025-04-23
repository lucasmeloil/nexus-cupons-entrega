function mostrarNotificacao(mensagem, cor = '#f44336') {
  const notificacao = document.getElementById('notificacao');
  notificacao.textContent = mensagem;
  notificacao.style.backgroundColor = cor;
  notificacao.classList.add('show');

  setTimeout(() => {
    notificacao.classList.remove('show');
  }, 3000);
}

function gerarCupom() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const observacao = document.getElementById("observacao").value;
  const data = document.getElementById("data").value;
  const statusPagamento = document.getElementById("statusPagamento").value;
  const metodoPagamento = document.getElementById("metodoPagamento").value;
  const valorTotal = document.getElementById("valorTotal").value;

  if (!nome || !telefone || !endereco || !data || !statusPagamento || !metodoPagamento || !valorTotal) {
    mostrarNotificacao("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  const [ano, mes, dia] = data.split("-");
  const dataCorrigida = new Date(ano, mes - 1, dia);
  const dataFormatada = dataCorrigida.toLocaleDateString("pt-BR");
  const horaAtual = new Date().toLocaleTimeString("pt-BR");

  const valorTotalFormatado = Number.parseFloat(valorTotal).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const cupomContent = `
    <div class="cupom-content">
        <hr>
        <div style="text-align: center;">
            <p><strong>SUA ENTREGA CHEGOU</strong></p>
        </div>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Observação:</strong> ${observacao || "Nenhuma"}</p>
        <p><strong>Status do Pagamento:</strong> ${statusPagamento}</p>
        <p><strong>Método de Pagamento:</strong> ${metodoPagamento}</p>
        <p><strong>Valor Total:</strong> ${valorTotalFormatado}</p>
        <p class="small-text">Data: ${dataFormatada} - Hora: ${horaAtual}</p>
        <hr>
        <p class="footer" style="text-align: center;"><strong>Obrigado pela preferência!</strong></p>
    </div>
  `;

  document.getElementById("cupomPreview").innerHTML = cupomContent;
  mostrarNotificacao("Cupom gerado com sucesso!", "#28a745");
}

function imprimirCupom() {
  const cupomContent = document.getElementById("cupomPreview").innerHTML;
  const tamanhoCupom = document.getElementById("tamanhoCupom").value;

  if (!cupomContent) {
    mostrarNotificacao("Por favor, gere um cupom antes de tentar imprimir.");
    return;
  }

  const larguraCupom = tamanhoCupom === "58mm" ? "48mm" : "72mm";

  const printWindow = window.open("", "_blank", "width=600,height=600");

  printWindow.document.write(`
    <html>
      <head>
        <title>Impressão de Cupom - Beauty Boutique</title>
        <style>
          body { font-family: Arial, "Courier New", monospace; margin: 0; padding: 0; }
          .cupom-content { width: ${larguraCupom}; margin: 0 auto; padding: 5px; font-size: 14px; line-height: 1.3; word-wrap: break-word; }
          .footer { text-align: center; margin-top: 10px; }
          hr { border: 0; border-top: 1px dashed #000; }
          p { margin: 5px 0; }
          strong { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="cupom-content">
          ${cupomContent}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("observacao").value = "";
  document.getElementById("data").value = "";
  document.getElementById("statusPagamento").value = "Pago";
  document.getElementById("metodoPagamento").value = "Cartão";
  document.getElementById("valorTotal").value = "";
  document.getElementById("tamanhoCupom").value = "58mm";
  document.getElementById("cupomPreview").innerHTML = "";
  mostrarNotificacao("Todos os campos foram limpos!", "#17a2b8");
}
